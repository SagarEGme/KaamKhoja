import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                console.log("try entered admin jobs");
                const res = await axios.get(`${JOB_API_END_POINT}/admin/jobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.job))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs