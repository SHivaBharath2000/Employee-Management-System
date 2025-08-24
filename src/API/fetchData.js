import { createAsyncThunk } from "@reduxjs/toolkit";


//Get all employees data
export const fetchUser=createAsyncThunk(
    'employee/fetchemployees',
    
    async () => {
        const response=await fetch('https://mocki.io/v1/d5dfb920-4cea-469c-af82-99235e3f15ab')
        const data=await response.json()
        return data
      
    }
)