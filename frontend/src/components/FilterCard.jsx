import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Kathmandu", "Lalitpur", "Bhaktapur", "Jhapa", "Kaski"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  return (
    <div className='mr-4 pl-3'>
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          fitlerData.map((data, index) =>
          (
            <div className='w-full bg-white'>
              <h1 className="font-bold text-md">{data.fitlerType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                      <div className='flex gap-2 my-1 pl-2'>
                        <RadioGroupItem value={item} id={index} />
                        <Label>{item}</Label>
                      </div>
                  )
                })
              }
            </div>
          )
          )
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard