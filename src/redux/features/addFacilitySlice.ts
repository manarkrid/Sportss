import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState ={
    name:"",
    description:"",
    pricePerHour:0,
    location:"",
    image:""
}

const addFacility = createSlice({
    name:"facility",
    initialState,
    reducers:{
        setName:(state,action:PayloadAction<string>) =>{
            state.name = action.payload
        },
        setDescription:(state,action:PayloadAction<string>) =>{
            state.description = action.payload
        },
        setPricePerHour:(state,action:PayloadAction<number>) =>{
            state.pricePerHour = action.payload
        },
        setLocation:(state,action:PayloadAction<string>) =>{
            state.location = action.payload
        },
        setImage:(state,action:PayloadAction<string>) =>{
            state.location = action.payload
        },
        resetFacility:()=> initialState
    }
})

export const {setDescription,setLocation,setPricePerHour,setName,resetFacility,setImage} = addFacility.actions
export default addFacility.reducer