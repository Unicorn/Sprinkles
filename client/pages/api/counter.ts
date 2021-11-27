/** @format */

import type { NextApiHandler } from 'next'

const countHandler: NextApiHandler = async (req, res) => {
  const { amount = 1 } = req.body

  res.setHeader('Content-Type', 'application/json')

  // simulate IO latency
  await new Promise(resolve => setTimeout(resolve, 500))

  return res.json({ data: amount })
}

export default countHandler
