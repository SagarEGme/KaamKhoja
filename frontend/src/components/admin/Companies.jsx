import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Companies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <>
            <Navbar />
            <div className='max-w-3xl mx-auto'>
                <div className='max-w-6xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className="w-fit"
                            placeholder="Filter by name"
                        />
                        <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                    </div>
                    <CompaniesTable />
                </div>
            </div>
        </>
    )
}

export default Companies