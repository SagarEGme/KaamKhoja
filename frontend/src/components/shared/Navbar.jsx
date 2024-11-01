import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx"
import { Avatar, AvatarImage } from "../ui/avatar.jsx"
import { Button } from "../ui/button.jsx"
import React from 'react'
import { BriefcaseBusiness, BriefcaseBusinessIcon, EarthLock, FolderSearch, Home, HomeIcon, LogOut, User, User2 } from "lucide-react"
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
        <div>
            <div className=' flex justify-between items-center mx-auto max-w-7xl h-16 p-4 '>
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <h1 className="text-md md:text-2xl font-bold uppercase "><span className="text-[#eb2525]">Kaam</span><span className='text-[#bd25eb]'>khoja</span></h1>
                </div>
                <div className="hidden sm:block" >
                    <ul className='flex md:font-medium gap-4 items-center'>
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
                        <div className="w-50">
                            <ul className="flex w-5 gap-2">
                                <Link to="/login"><Button variant="outline" className="w-6 h-6 sm:w-12 sm:h-12 text-[10px] sm:text-[14px]">Login</Button></Link>
                                <Link to="/signup"> <Button className="bg-zinc-700 hover:bg-zinc-950 w-9 sm:w-17 sm:h-12 h-6 text-[9px] sm:text-[14px]">Signup</Button></Link>
                            </ul>
                        </div>
                    ) : (

                        <div>
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
                                    {/* for small screen */}
                                    <div className="sm:hidden flex items-start justify-center flex-col">
                                        <div >
                                            <ul className='flex  font-normal gap-4 flex-col mb-3'>
                                                {
                                                    user && user.role === 'recruiter' ? (
                                                        <>
                                                            <li className="flex items-center justify-start gap-9"><BriefcaseBusinessIcon/><Link to="/admin/jobs">Jobs</Link></li>
                                                            <li className="flex items-center justify-start gap-9"><EarthLock /><Link to="/admin/companies">Companies</Link></li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li className="flex items-center justify-start gap-9"><Home/><Link to="/">Home</Link></li>
                                                            <li className="flex items-center justify-start gap-9"><BriefcaseBusiness /><Link to="/jobs">Jobs</Link></li>
                                                            <li className="flex items-center justify-start gap-9"><FolderSearch/><Link to="/browse">Browse</Link></li>
                                                        </>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex items-left flex-col">

                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex items-center gap-4 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className="flex gap-4 items-center hover:underline">
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