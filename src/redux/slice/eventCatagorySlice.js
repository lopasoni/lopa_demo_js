import {createSlice} from "@reduxjs/toolkit"

const eventCatagorySlice = createSlice({
    name :"eventCatagorySlice",

    initialState : {
        eventeCatagoryData : [],
        eventListing : [] ,
    },

    reducers : {
        saveData : (state,action) => {
            state.eventeCatagoryData = [...state.eventeCatagoryData ,action.payload]
        },
        setData : (state,action) =>{
            state.eventListing = [...state.eventListing ,action.payload]
        },
        deleteEvent : (state,action) => {
            state.eventeCatagoryData = state.eventeCatagoryData.filter(i => i.name !== action.payload)
            state.eventListing = state.eventListing.filter(i => i.catagory !== action.payload)
        }
    }
})

export default eventCatagorySlice.reducer;
export const {saveData,setData,deleteEvent} = eventCatagorySlice.actions