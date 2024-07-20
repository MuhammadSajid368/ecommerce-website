import React from 'react'
import CategoreyList from '../Components/CategoreyList'
import BannerProduct from '../Components/BannerProduct'
import HorizontalCardProduct from '../Components/HorizontalCardProduct'
import Footer from '../Components/Footer'
import VerticalCardProduct from '../Components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='container mx-auto px-4 w-full'>
      <CategoreyList />
      <BannerProduct />
      <HorizontalCardProduct heading={"Top's Airpodes"} categorey={"Airpodes"} />
      <HorizontalCardProduct heading={"Popular's Watches"} categorey={"Watches"} />
      <VerticalCardProduct heading={"Mobiles"} categorey={"Mobiles"} />
      <VerticalCardProduct heading={"Mouse"} categorey={"Mouse"} />
      <VerticalCardProduct heading={"Televisions"} categorey={"Televisions"} />
      <VerticalCardProduct heading={"Camera & Photography"} categorey={"Camera"} />
      <VerticalCardProduct heading={"Earphones"} categorey={"Airphones"} />
      <VerticalCardProduct heading={"Loud Spearkers"} categorey={"Speakers"} />
      <VerticalCardProduct heading={"Refrigerator"} categorey={"Refrigerator"} />
      <VerticalCardProduct heading={"Trimmers"} categorey={"Trimmers"} />

    </div>
  )
}

export default Home