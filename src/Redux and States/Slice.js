import { createSlice } from "@reduxjs/toolkit"
import { fetchUser } from "../API/fetchData"

const employeeSlice = createSlice({
    name:"employee",
    initialState:{
        employeeData:[],
        status:"idle",
        initialRender:false
    },
    reducers:{
        addEmployee:(state,action)=>{
           state.employeeData.push(action.payload);
           console.log(state.employeeData)
           localStorage.setItem("employeeList", JSON.stringify(state.employeeData));
        },
        getALlEmployee:(state,action)=>{
            let getList=localStorage.getItem("employeeList")
            //Parse string into object
            getList=JSON.parse(getList)
            state.employeeData=getList.reverse()
        },

        //update the specific employee
        updateEmployee:(state,action)=>{
            let updateData=action.payload
            let {index}=updateData
            let employeesData=localStorage.getItem("employeeList")
            employeesData=JSON.parse(employeesData)
            employeesData[index]=updateData
            localStorage.setItem("employeeList",JSON.stringify(employeesData))

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.status="success"
            //add the api data in the local storage
            localStorage.setItem("employeeList",JSON.stringify(action.payload))
            state.initialRender=true
         
        })
        .addCase(fetchUser.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status="rejected"
        })
    }
})
export const {addEmployee,getALlEmployee,updateEmployee}=employeeSlice.actions
export default employeeSlice.reducer

