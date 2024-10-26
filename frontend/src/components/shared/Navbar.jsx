import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx"
import { Avatar, AvatarImage } from "../ui/avatar.jsx"
import { Button } from "../ui/button.jsx"
import React from 'react'
import { LogOut, User, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { USER_API_END_POINT } from "@/utils/constants.js"
import { setUser } from "@/redux/authslice.js"
import axios from "axios"

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => { // while calling api always use async await.
        const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    }
    return (
        <div className="bg-white">
            <div className=' flex justify-between items-center mx-auto max-w-7xl  h-16 '>
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <h1 className="text-2xl font-bold uppercase "><span className="text-[#eb2525]">Kaam</span><span className='text-[#bd25eb]'>khoja</span></h1>
                </div>
                <div >
                    <ul className='flex font-medium gap-4 items-center'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                </div>
                {
                    !user ? (
                        <div className=" mr-2 h-[80%]">
                            <ul className="flex gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"> <Button className="bg-zinc-700 hover:bg-zinc-950">Signup</Button></Link>
                            </ul>
                        </div>
                    ) : (

                        <div className="m-12">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user.profile.profilePhoto ? user?.profile.profilePhoto : "https://github.com/shadcn.png"} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="pb-3 flex items-center gap-4">

                                        <div>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user.profile.profilePhoto ? user?.profile.profilePhoto : "https://github.com/shadcn.png"} alt="@shadcn" />

                                            </Avatar>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold uppercase">{user ? user?.fullName : "Sagar Regmi"} <span className="text-sm lowercase text-gray-400">({user?.role})</span></h4>
                                            <h5 className="text-xs">{user?.profile.bio}</h5>
                                        </div>
                                    </div>
                                    <div className="flex items-left flex-col mx-auto ">

                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className="mt-2 flex items-center hover:underline">
                                            <LogOut className="text-red-800" />
                                            <Button onClick={logoutHandler} variant="Link" className="text-red-800">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Navbar