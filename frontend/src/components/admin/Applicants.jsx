import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const {allApplicants} = useSelector(store=>store.application)
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res) {
                    dispatch(setAllApplicants(res.data.job.applications))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchApplicants();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto p-2'>
                <h1 className='font-bold text-xl my-5'>Applicants {allApplicants.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants