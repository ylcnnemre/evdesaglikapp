import { createSlice } from "@reduxjs/toolkit"

export interface InewPersonType {
    personInfo: { "Ad": string, "Soyad": string, "Yas": string, Cinsiyet: string, Boy: string, Kilo: string, Sehir: string, İlce: string, Adres: string }
    sikayetList: Array<{ id: string, title: string, desc: string }>
    hastalikList: Array<{ id: string, title: string, desc: string }>
}

const initialState: InewPersonType = {
    personInfo: {
        Ad: "",
        Soyad: "",
        Boy: "",
        Cinsiyet: "",
        İlce: "",
        Kilo: "",
        Sehir: "",
        Yas: "",
        Adres: ""
    },
    sikayetList: [],
    hastalikList: []
}

const newPatient = createSlice({
    name: "patient",
    initialState,
    reducers: {
        addNewPersonInfo: (state, action) => {
            state.personInfo = {
                ...state.personInfo,
                ...action.payload
            }
        },
        addSikayetInfo: (state, action: { type: string, payload: { id: string, desc: string, title: string } }) => {
            state.sikayetList = [...state.sikayetList, action.payload]
        },
        editSikayetInfo: (state, action: { type: string, payload: { id: string, desc: string, title: string } }) => {
            state.sikayetList = state.sikayetList.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
        },
        addHastalikInfo: (state, action: { type: string, payload: { id: string, desc: string, title: string } }) => {
            state.hastalikList = [...state.hastalikList, action.payload]
        },
        editHastalikInfo: (state, action: { type: string, payload: { id: string, desc: string, title: string } }) => {
            state.hastalikList = state.hastalikList.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
        },
    }
})

export const newPatientReducer = newPatient.reducer
export const { addNewPersonInfo, addSikayetInfo, editSikayetInfo, addHastalikInfo, editHastalikInfo } = newPatient.actions