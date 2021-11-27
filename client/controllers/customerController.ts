/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '@/controllers/reduxController'
import { License } from '@/helpers/licenseParser'
import { ApiError, Customer, Error, SearchCustomersRequest, SearchCustomersResponse } from 'square'
import { client } from '@/constants/square'

export interface CustomerState {
  status: 'idle' | 'loading' | 'failed'
  value: Customer | null
  errors?: Error[]
}

const initialState: CustomerState = {
  status: 'idle',
  value: null,
}

export async function _fetchCustomerByLicense(license: License): Promise<SearchCustomersResponse> {
  const response = await fetch('/api/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ license }),
  })

  const result = await response.json()

  return result
}

// async function _fetchCustomerByLicense(license: License): Promise<SearchCustomersResponse> {
//   const body: SearchCustomersRequest = {
//     limit: BigInt(1),
//     query: {
//       filter: {
//         referenceId: {
//           exact: license?.num,
//         },
//       },
//     },
//   }

//   console.log('here')

//   try {
//     const { result, ...httpResponse } = await client.customersApi.searchCustomers(body)
//     // Get more response info...
//     // const { statusCode, headers } = httpResponse;
//     console.log('result', result)
//     return result
//   } catch (error) {
//     if (error instanceof ApiError) {
//       const errors = error.result
//       console.log('Error fetching customer', error)
//       // const { statusCode, headers } = error;
//     }
//   }
// }

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCustomerByLicense = createAsyncThunk('customer/fetchCustomerByLicense', async (license: License) => {
  const response = await _fetchCustomerByLicense(license)
  // The value we return becomes the `fulfilled` action payload
  return response || null
})

// export const fetchCustomerByLicense =
//   (license: License): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCustomer(getState())

//     dispatch(update(amount))
//   }

export const customerReducer = createSlice({
  name: 'customer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clear: () => initialState,
    update: (state, action: PayloadAction<Customer>) => {
      state.status = 'idle'
      state.value = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: builder => {
    builder
      .addCase(fetchCustomerByLicense.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCustomerByLicense.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload.customers[0]
        state.errors = action.payload.errors
      })
  },
})

export const { clear, update } = customerReducer.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.customer.value)`
export const selectCustomer = (state: AppState) => state.customer

export default customerReducer.reducer
