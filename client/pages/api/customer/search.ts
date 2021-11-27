/** @format */

import type { NextApiHandler } from 'next'
import { ApiError, SearchCustomersRequest } from 'square'

import '@/helpers/bigint.extension'
import { client } from '@/constants/square'

const customerHandler: NextApiHandler = async (req, res) => {
  const { license } = req.body
  res.setHeader('Content-Type', 'application/json')

  const body: SearchCustomersRequest = {
    limit: BigInt(1),
    query: {
      filter: {
        referenceId: {
          exact: license?.num,
        },
      },
    },
  }

  try {
    const { statusCode, result, headers } = await client.customersApi.searchCustomers(body)
    console.log('result in customer/search', result)

    Object.keys(headers).map(k => res.setHeader(k, headers[k]))

    const data = result.customers ? result.customers[0] : null
    const errors = result.errors?.map(err => err.detail)
    res.status(statusCode).json({ data, errors })
  } catch (error) {
    if (error instanceof ApiError) {
      console.log('SQ API Error:', error.errors)
      const errors = error.errors?.map(err => err.detail)
      res.status(error.statusCode).json({ errors })
    } else {
      console.log('Unhandled Error:', error)
      res.status(500).json({ errors: error })
    }
  }
}

export default customerHandler
