import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Kathmandu", "Lalitpur", "Bhaktapur", "Jhapa", "Sanischare"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Engineer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  const dispatch  = useDispatch();
  const [selectedValue,setSelectedValue] = useState("")
  const clearSearhcHandler=()=>{
    dispatch(setSearchQuery(""));
    setSelectedValue("")
}
  const changeHandler=(value)=>{
    setSelectedValue(value)
  }

  useEffect(()=>{
    dispatch(setSearchQuery(selectedValue));
  },[selectedValue])
  return (
    <div className='mr-4 pl-3'>
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          fitlerData.map((data, index) =>
          (
            <div className='w-full bg-white' key={index}>
              <h1 className="font-bold text-md">{data.fitlerType}</h1>
              {
                data.array.map((item, ind) => {
                  return (
                      <div className='flex gap-2 my-1 pl-2' key={ind}> 
                        <RadioGroupItem value={item} id={index-ind} />
                        <Label htmlFor={index-ind}>{item}</Label>
                      </div>
                  )
                })
              }
            </div>
          )
          )
        }
      </RadioGroup>
      <Button className="mt-4 p-2" onClick={clearSearhcHandler}>Clear Search</Button>

    </div>
  )
}

export default FilterCard