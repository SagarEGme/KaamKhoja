import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science Engineer",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="mx-auto w-full max-w-2xl my-20">
                <CarouselContent className="mx-auto">
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="w-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                    <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel