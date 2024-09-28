import React from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero';
import CatergoryCarousel from './CatergoryCarousel';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <CatergoryCarousel/>
    </div>
  )
}

export default Home;