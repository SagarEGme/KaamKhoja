import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading ,setUser } from "@/redux/authslice"
import { Loader2 } from 'lucide-react'


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const {loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"  // since we are only sending json data .. remember : app.use(express.json());
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error in submitting login form", error)
      toast.success(error.message)
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl p-3">
        <form onSubmit={submitHandler} className='md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <div className=' flex justify-center items-center'>
            <h1 className='font-bold text-xl mb-5'>Login</h1>
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Eg - sagar123regmi@gmail.com"
              required
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              required
            />
          </div>
          <div>
            <RadioGroup className="flex items-center gap-4 justify-around">
              <div className="flex items-center space-x-2 ">
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ">
                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>


          {
            loading ? <Button className="w-full  my-4"><Loader2 className='mr-2 animate-spin' />Please Wait !</Button> : (

              <Button type="submit" className="w-full my-4">Log in</Button>
            )
          }
          <span className="text-sm">If new, please signup first ! <Link to="/signup" className='text-blue-600 hover:underline'>Signup</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login