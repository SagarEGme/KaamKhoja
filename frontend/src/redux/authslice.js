import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        allAppliedJobs:[],
    },
    reducers:{ // skipped 2 days getting frustated
        setLoading:(state, action) =>{
            state.loading = action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload;
        }
    }
})

export const {setLoading,setUser,setAllAppliedJobs} = authSlice.actions;
export default authSlice.reducer;