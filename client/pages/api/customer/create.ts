/** @format */

import type { NextApiHandler } from 'next'
import { ApiError, CreateCustomerRequest } from 'square'
import { v4 } from 'uuid'

import '@/helpers/bigint.extension'
import { client } from '@/constants/square'

const customerHandler: NextApiHandler = async (req, res) => {
  const { license } = req.body
  res.setHeader('Content-Type', 'application/json')

  const body: CreateCustomerRequest = {
    idempotencyKey: v4(),
    birthday: `${license?.dob.year}-${license?.dob.month}-${license?.dob.day}T00:00:00-00:00`,
    referenceId: license?.num,
  }

  try {
    const { statusCode, result, headers } = await client.customersApi.createCustomer(body)
    console.log('result in customer/create', result)

    Object.keys(headers).map(k => res.setHeader(k, headers[k]))

    const data = result.customer || null
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
