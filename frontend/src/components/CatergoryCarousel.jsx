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
        if (jobTitle) navigate("/browse");
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
            <Carousel className="mx-auto w-full max-w-xl my-20">
                <CarouselContent>
                    {
                       allJobs?.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Button onClick={() => searchJobHandler(cat?.title)} variant="outline" className="rounded-full w-full">{cat?.title}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </>

    )
}

export default CategoryCarousel