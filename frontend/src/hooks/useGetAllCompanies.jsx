import { setAllCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                console.log("res ponse",res)
                if (res.data) {
                    dispatch(setAllCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error.message);

            }
        }
        getCompanies();
    }, [])
}

export default useGetAllCompanies