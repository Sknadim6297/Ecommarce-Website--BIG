import React from 'react'
import CategoryList from '../Components/CategoryList'
import BannerProduct from '../Components/BannerProduct'
import HorizontalCardProduct from '../Components/HorizontalCardProduct'
import VerticalCardProduct from '../Components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <HorizontalCardProduct category={"televisions"} heading={"Popular's Televisions"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Mobile Phones"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouses"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & PhotoGraphy"}/>
      <VerticalCardProduct category={"earphones"} heading={"Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators  "}/>
      <VerticalCardProduct category={"processor"} heading={"Top Processers"}/>
    </div>
  )
}

export default Home
