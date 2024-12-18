import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authslice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: '',
    password: "",
    role: '',
    file: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {

      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': "multipart/form-data"  // for form data : app.use(express.urlencoded({extended:true}))
        },
        withCredentials: true,
      });
      console.log("response is ", res);
      if (res.data.success) {
        navigate("/login")
        toast.success(res?.data.message);
      }
    } catch (error) {
      console.log("error in submitting signup form", error)
      navigate("/signup")
      toast.error(error.response.data.message)

    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <div className=' flex justify-center items-center'>
            <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          </div>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Sagar Regmi"
            />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Eg:sagar123regmi@gmail.com"
            />
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="9876543210"
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
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ">
                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Label>Profile</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer" />
          </div>
          <div className='flex flex-col mt-2 '>

            {
              loading ? <Button><Loader2 className=' h-4 mr-3 animate-spin' />Please Wait !</Button> : (

                <Button type="submit" className="w-full my-4">Sign up</Button>
              )
            }
            <span className="text-sm">Already have an accout?<Link to="/login" className='text-blue-600 hover:underline'>Login</Link></span>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup