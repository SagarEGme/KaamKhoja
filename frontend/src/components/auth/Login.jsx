import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    console.log(input);
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
      <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <div className=' flex justify-center items-center'>
            <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          </div>
                   <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Eg - sagar123regmi@gmail.com"
            />
          </div>
                    <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <RadioGroup className="flex items-center gap-4 items-center justify-around">
              <div className="flex items-center space-x-2 ">
                <Input type="radio" name="role" value="student" checked={input.role==="student"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ">
                <Input type="radio" name="role" value="recruiter" checked={input.role==="recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4">Log in</Button>
          <span className="text-sm">If new, please signup first ! <Link to="/signup" className='text-blue-600 hover:underline'>Signup</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login