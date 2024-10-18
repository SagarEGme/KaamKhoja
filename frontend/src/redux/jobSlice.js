import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"jobSlice",
    initialState:{
        allJobs:[],
        singleJob:null,
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        }

    }
});

export const {setAllJobs,setSingleJob} = jobSlice.actions;
export default jobSlice.reducer;