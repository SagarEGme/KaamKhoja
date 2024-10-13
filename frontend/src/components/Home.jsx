import React from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero';
import CatergoryCarousel from './CatergoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Home = () => {
  useGetAllJobs();
  return (
    <div>
        <Navbar />
        <Hero />
        <CatergoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home;