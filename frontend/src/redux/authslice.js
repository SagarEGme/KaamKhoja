import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        allSavedJobs: [],
        allAppliedJobs: [],
    },
    reducers: { // skipped 2 days getting frustated
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setAllSavedJobs: (state, action) => {
            console.log(action.payload)
            const jobid = action.payload;
            console.log("jobid type" ,typeof jobid)
            if(!state.allSavedJobs.includes(jobid)){
                state.allSavedJobs.push(jobid);
            } else{
                console.log("no");
                
            }
                        
        }
    }
})

export const { setLoading, setUser, setAllAppliedJobs, setAllSavedJobs } = authSlice.actions;
export default authSlice.reducer;