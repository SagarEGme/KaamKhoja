import React from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero';
import CatergoryCarousel from './CatergoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';

const Home = () => {
  return (
    <div>
      <div className='min-h-screen'>
        <Navbar />
        <Hero />
        <CatergoryCarousel />
      </div>
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home;