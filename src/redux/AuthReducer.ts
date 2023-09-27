import { createSlice } from "@reduxjs/toolkit"

export interface Iauth {
    auth: boolean
}


const initialState: Iauth = { auth: false }

const authReduce = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.auth = true
        },
        logout: (state, action) => {
            state.auth = false
        }
    }
})

export const authReducer = authReduce.reducer
export const { login, logout } = authReduce.actions