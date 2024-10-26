import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice'




const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science Engineer",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const { allJobs } = useSelector(store => store.job);
    // console.log(allJobs[0].title)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (jobTitle) => {
        dispatch(setSearchQuery(jobTitle));
        navigate("/browse");
    }
    return (<>
        {/* <div>
            <Carousel className="max-w-4xl mx-auto my-20">
                <CarouselPrevious />
                <CarouselContent className="w-full gap-3 bg-purple-600 flex items-center justify-center">
                    {
                        allJobs?.map((cat, index) => (
                            <CarouselItem key={index} className=" bg-red-500 sm:basis-1/2 md:basis-1/2 lg:basis-1/2 flex justify-center items-center">
                                <Button onClick={() => searchJobHandler(cat?.title)} variant="outline" className="rounded-full mx-[50%]">{cat?.title}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        </div> */}
        <div>
            <Carousel className="max-w-3xl mx-auto my-20 ">
                <CarouselContent className="-ml-2 md:-ml-4">
                        {
                            allJobs.map((item, index) => (
                                <CarouselItem className="rounded-full w-full mx-auto pl-2 md:pl-4 flex items-center justify-center basis-1/2 md:basis-1/2 lg:basis-1/3"><Button variant="secondary" className="p-2 w-full font-mono text-lg rounded-full">{item?.title}</Button></CarouselItem>
                            ))
                        }
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    </>

    )
}

export default CategoryCarousel