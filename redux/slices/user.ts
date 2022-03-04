import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { number } from 'prop-types'
import { AppState } from '../store'

export interface User {
  data: {
    auth: boolean,
    uid: string,
    name: string,
    email: string,
    age: number,
    gender: string,
  },
}

const initialState: User = {
  data: {
    auth: false,
    uid: null,
    name: null,
    email: null,
    age: null,
    gender: null,
  },
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.User.data
    }
  }
})

export const { setUser } = userSlice.actions

export const selectUser = (state: AppState) => state.User

export const userReducer = userSlice.reducer

