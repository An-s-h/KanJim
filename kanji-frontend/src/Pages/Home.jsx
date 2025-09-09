import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import JapaneseConversationSection from '../Components/JapaneseConversationSection'
import TransparentFooter from '../Components/TransparentFooter'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">

    <HeroSection />
    <JapaneseConversationSection />
    <TransparentFooter />
 </div>  
  )
}



export default Home
