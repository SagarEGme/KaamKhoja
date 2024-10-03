import React from 'react'
import Job from './Job'
import Navbar from './shared/Navbar'

const Browse = () => {
    const allJobs = [1,2,3,4,5];
  return (
    <div>
    <Navbar />
    <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-3'>
            {
                [1,2,3,4].map((job) => {
                    return (
                        <Job />
                    )
                })
            }
        </div>

    </div>
</div>
  )
}

export default Browse