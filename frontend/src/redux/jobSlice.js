import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobSlice",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        searchQuery:"",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload;
        }

    }
});

export const { setAllJobs, setSingleJob, setAllAdminJobs , setSearchJobByText,setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;