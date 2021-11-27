/** @format */

import type { NextApiHandler } from 'next'
import { SearchCustomersRequest, ApiError } from 'square'

import { client } from '@/constants/square'

BigInt.prototype.toJSON = function () {
  return this.toString()
}

const customerHandler: NextApiHandler = async (req, res) => {
  const { license } = req.body
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'max-age=180000')

  const body: SearchCustomersRequest = {
    limit: BigInt(1),
    query: {
      filter: {
        referenceId: {
          // exact: license?.num,
          exact: '246119135670',
        },
      },
    },
  }

  try {
    const { statusCode, result } = await client.customersApi.searchCustomers(body)
    console.log('result', result.customers[0])
    res.statusCode = statusCode
    return res.status(statusCode).json(result)
  } catch (error) {
    if (error instanceof ApiError) {
      const { statusCode, result } = error
      console.log('Error fetching customer', error)
      return res.status(statusCode).json(result)
    }
  }
}

export default customerHandler
