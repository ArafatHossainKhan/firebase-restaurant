import { motion } from "framer-motion";
import React, { useEffect, useRef } from 'react';
import { CgShoppingCart } from "react-icons/cg";
import NotFound from "../../assets/NotFound.svg";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const RowContainer = ({flag, data, scrollValue}) => {

  
    const rowContainer = useRef()
    const [{cartItems}, dispatch] = useStateValue()

   

    const addtocart = (item) => {
        
    // const filterCart = cartItems.find((i) => i.id  === item.id)
   

    dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: [...cartItems, item]
    })
  
   }

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
    }, [scrollValue])


   useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

   }, [cartItems])

 
    
  return (
    <div ref={rowContainer} className={`w-full  ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'} flex items-center mt-8 gap-3 scroll-smooth`}>
        {data && data.length > 0 ? (
            data?.map((item) => (
                <div key={`${item.name}+${item.id}`} className='w-350  h-[265px] my-6 min-w-[275px] md:min-w-[300px] md:w-300 p-4 bg-cardOverlay rounded-lg backdrop-blur-lg hover:drop-shadow-xl flex flex-col items-center justify-between'>
                    <div className='w-full flex items-center justify-between mt-12 '>
                        <motion.div whileHover={{scale: 1.1}} className=" -mt-20 drop-shadow-2xl">
                        <img  src={item.imageUrl} alt='' className='w-40 h-40 object-contain'/>
                        </motion.div>
                      
                        <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-xl' onClick={() => addtocart(item)}>
                            <CgShoppingCart className='text-white'/>
                        </motion.div>
                    </div>
                    <div className="w-full flex flex-col gap-1 items-end justify-end">
                        <p className="text-textColor font-semibold text-base md:text-lg">{item.title}</p>
                        <p className="text-sm text-gray-500">45 calories</p>
                        <div className="flex items-center gap-8">
                            <p className="text-lg text-textColor font-semibold"><span className="text-sm text-red-500">$</span>{item.price}</p>
                        </div>
                    </div>
            </div>
            ))
        ) : (
        <div className="w-full flex flex-col items-center justify-center">
            <img src={NotFound} alt="not-found-img" className="h-420"/>
            <p className="text-2xl">Items Not Available</p>
        </div>
        )}
        

      
    </div>
  )
}

export default RowContainer