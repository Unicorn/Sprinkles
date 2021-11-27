/** @format */
import { Client, Environment } from 'square'

export const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.SQUARE_SECRET,
})
