import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx"
import { Avatar, AvatarImage } from "../ui/avatar.jsx"
import { Button } from "../ui/button.jsx"
import React from 'react'
import { LogOut, User } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    let user = false;
    return (
        <div className="bg-white">
            <div className=' flex justify-between items-center mx-auto max-w-7xl  h-16 '>
                <div className=" ml-2">
                    <h1 className="text-2xl font-bold">Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div >
                    <ul className='flex font-medium gap-4 items-center'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browser</li>
                    </ul>
                </div>
                {
                    !user ? (
                        <div className=" mr-2">
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
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=" border-b-2 pb-3 border-slate-600 flex gap-4">

                                        <div>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            </Avatar>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Sagar Regmi</h4>
                                            <h5 className="text-xs">Lorem ipsum dolor sit.</h5>
                                        </div>
                                    </div>
                                    <div className="flex  justify-around gap-5">

                                        <div className="mt-2 flex justify-between items-center ">
                                            <User className="text-blue-800" />
                                            <Button variant="Link" className="text-blue-800 ">View Profile</Button>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <LogOut className="text-red-800" />
                                            <Button variant="Link" className="text-red-800">Login</Button>
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