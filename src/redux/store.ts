import { configureStore } from "@reduxjs/toolkit"
import { Iauth, authReducer } from "./AuthReducer"
import { InewPersonType, newPatientReducer } from "./NewPatienReducer"


export interface IselectorType {
    authReducer: Iauth
    newPatient: InewPersonType
}


const store = configureStore({
    reducer: {
        authReducer: authReducer,
        newPatient: newPatientReducer
    }
})


export {
    store
}