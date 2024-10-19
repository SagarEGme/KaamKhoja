import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        
        console.log("entered admin jobs");
        console.log("entered admin jobs");
        const fetchAllAdminJobs = async () => {
            try {
                console.log("try entered admin jobs");
                const res = await axios.get(`${JOB_API_END_POINT}/admin/jobs`, { withCredentials: true });
                console.log('hello',res)
                if (res) {
                    // console.log("data found");
                    
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs