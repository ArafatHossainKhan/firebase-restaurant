import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useStateValue } from '../../context/StateProvider'
import CartContainer from '../CartContainer/CartContainer'
import HomeContainer from '../Homecontainer'
import MenuContainer from '../MenuContainer/MenuContainer'
import RowContainer from '../RowContainer/RowContainer'

const MainContainer = () => {
  const [{foodItems, cartShow}, dispatch] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0)
  
useEffect(() => {
  
},[scrollValue, cartShow])

  return (
    <div className='w-full p-4 h-auto flex flex-col items-center justify-center'>
        <HomeContainer/>

        <section className='w-full my-12'>
          <div className='w-full flex items-center justify-between'>
            <p className='text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-red-300 to-red-600 transition-all ease-in-out duration-100'>
              Our Hot Dishes 
            </p>
            <div className='hidden md:flex gap-3 items-center'>
              <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-lg bg-cardOverlay hover:bg-primary flex items-center justify-center cursor-pointer transition-all duration-100 ease-out'><MdChevronLeft onClick={() => setScrollValue(200)} className='text-lg text-white'/></motion.div>
              <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-lg bg-cardOverlay hover:bg-primary flex items-center justify-center cursor-pointer transition-all duration-100 ease-out'><MdChevronRight onClick={() => setScrollValue(-200)} className='text-lg text-white'/></motion.div>
            </div>
          </div>
          <RowContainer scrollValue={scrollValue} data={foodItems?.filter((n)=>  n.category === "chicken" )} flag={true}/>
        </section>

        <MenuContainer/>
        {cartShow && <CartContainer/>}
        
    </div>
  )
}

export default MainContainer