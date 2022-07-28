import React from 'react'
import Delivery from "../../assets/delivery.png"
import HeroBg from "../../assets/hero.jpg"
import { heroData } from '../../utlis/data'



const HomeContainer = () => {
  return (
    <section id="home" className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 w-full xl:h-90vh '>
         <div className='p-3 flex-1 flex flex-col items-start md:items-start justify-center gap-6'>
           
           <div className='flex items-center justify-center bg-cardOverlay shadow-2xl px-3 py-2 rounded-full gap-2'>
               <p className='font-semibold text-base '>Bike Delivery</p>
               <div className='w-8 h-8 rounded-full overflow-hidden drop-shadow-xl'>
                   <img src={Delivery} alt="delivery" className='w-full h-full object-contain  '/>
               </div>
           </div>

           <p className='text-[3rem] font-bold tracking-wide md:text-[5rem]'>The Fastest Delivery in<span className='text-red-600'> The Planet</span>
           </p>
           <p className='text-base text-textColor md:w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eaque odio, quisquam ut repudiandae eveniet dolore harum laboriosam eius optio molestiae beatae libero, delectus laudantium quae, necessitatibus voluptatem consequuntur obcaecati!</p>
           <button type='button' className='bg-gradient-to-br from-red-400 to-red-600 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
          
       </div>
       <div className='flex-1  w-full flex items-center relative'>
            <img src={HeroBg} alt="hero" className='rounded-3xl h-420 w-full lg:h-650 lg:w-auto ml-auto'/>
            <div className=" w-full h-full absolute top-45 left-0 flex flex-col lg:flex-row lg:h-auto lg:w-ful items-center justify-center gap-6 flex-wrap ">
                {heroData.map((item) => (
                    <div key={item.id} className='mt-8 lg:w-190  p-4 bg-cardOverlay backdrop-blur-sm rounded-3xl flex flex-col justify-center
                    drop-shadow-lg
                    items-center
                    lg:mt-20'>
                    <img src={item.imgSrc} alt="ice-cream" className=' w-24 h-24  lg:w-40 lg:h-40 -mt-10 lg:-mt-20 object-contain'/>
                    <p className='text-base font-semibold text-textColor'>{item.name}</p>
                    <p className='text-sm font-semibold text-textColor'>{item.desc}</p>
                    <p className='text-sm font-semibold text-textColor'><span className='text-red-700 font-semibold'>$</span> {item.price}</p>
                </div>
                ))}
            </div>
       </div>
    </section>
   
  )
}

export default HomeContainer