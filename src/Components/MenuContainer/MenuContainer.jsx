import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IoFastFood } from "react-icons/io5"
import { categories } from '../../utlis/data'
import { getAllFoodItems } from '../../utlis/firebaseFunctions'
import RowContainer from '../RowContainer/RowContainer'
const MenuContainer = () => {

    const [filter,setFilter] = useState("chicken")
    const [data, setData] = useState([])
    const food = () => {
        getAllFoodItems().then((n) => setData(n))
    }
    useEffect(() => {food()}, [])
  
    
    
  return (
    <section className='w-full' id='menu'>
        <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-40 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-red-300 to-red-600 transition-all ease-in-out duration-100 mr-auto'>
              Our Fresh & Healthy Fruits
        </p>
        </div>

        <div className='w-full flex items-center justify-start lg:justify-center gap-8 my-12 overflow-x-scroll scrollbar-none'>
            {categories?.map((e) => 
                <motion.div whileTap={{scale: 0.6}} key={e.id} className={`group ${filter === e.ulrParamName ? 'bg-primary' : 'bg-cardOverlay'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center duration-150 transition-all ease-in-out hover:bg-primary gap-3`} onClick={() => { setFilter(e.ulrParamName)}}>
                <div className={`w-10 h-10 rounded-full group-hover:bg-white flex items-center justify-center shadow-xl ${filter === e.ulrParamName ? 'bg-white' : 'bg-white'}`}>
                    <IoFastFood className={`text-primary group-hover:text-primary text-lg ${filter === e.ulrParamName ? 'text-textColor' : 'text-white'}`}/>
                </div>
                <p className={`text-sm group-hover:text-white ${filter === e.ulrParamName ? 'text-white' : 'text-textColor'}`}>{e.name}</p>
            </motion.div>
            )}
        </div>
        <div className='w-full'>
            <RowContainer flag={false} data={data?.filter(n => n.category === filter)}/>
        </div>
    </section>
  )
}

export default MenuContainer