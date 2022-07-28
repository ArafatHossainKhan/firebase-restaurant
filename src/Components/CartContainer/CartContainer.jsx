import { motion } from "framer-motion"
import React from 'react'
import { BiMinus, BiPlus } from "react-icons/bi"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RiRefreshFill } from "react-icons/ri"
import { actionType } from "../../context/reducer"
import { useStateValue } from "../../context/StateProvider"



const CartContainer = () => {

    const [{cartShow, cartItems},dispatch] = useStateValue();

    const showCart = ()=> {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }
  return (
    <motion.div
        initial={{opacity: 0, x:200}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x:200}}
        className='w-full md:w-375 h-screen bg-bagroundColor drop-shadow-lg flex flex-col fixed top-0 right-0 z-[101]'>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div whileTap={{scale: 0.75}} onClick={showCart}>
            <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
            </motion.div>

            <p className="text-textColor text-lg font-semibold">Cart</p>
            <motion.p whileTap={{scale: 0.75}} className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base">Clear <RiRefreshFill className="text-textColor text-3xl"/></motion.p>
         </div>
                        {/* Bottom section */}
         <div className="w-full h-full bg-primary rounded-t-[2rem] flex flex-col">

            <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {/* cart items */}

                {cartItems && cartItems.map((e) => (
                     <div className="w-full p-1 px-2 rounded-lg bg-cardOverlay flex items-center gap-2 text-white">
                     <img src={e.imageUrl} alt="" className="w-20 h-20 max-w-[60px] object-contain rounded-full "/>
 
                      {/* name section */}
                     <div className="flex flex-col gap-1">
                         <p className="text-base text-black">{e.title}</p>
                         <p className="text-black text-sm font-semibold">${e.price}</p>
                     </div>
 
                     {/* button */}
                     <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                         <motion.div whileTap={{scale: 0.75}}>
                             <BiMinus className="text-black text-xl"/>
                         </motion.div>
                         <p className="w-5 h-5 bg-red-500 text-sm flex items-center justify-center rounded-full">1</p>
                         <motion.div whileTap={{scale: 0.75}}>
                             <BiPlus className="text-black text-xl"/>
                         </motion.div>
                     </div>
                 </div>
                ))}
               
            </div>

            <div className="w-full flex-1 bg-cardOverlay rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-black text-lg">Sub Total</p>
                    <p className="text-black text-lg">$ 8.5</p>
                </div>

                <div className="w-full flex items-center justify-between">
                    <p className="text-black text-lg">Delivery</p>
                    <p className="text-black text-lg">$ 8.5</p>
                </div>
                <div className="w-full border-b border-gray-600 my-2"></div>
                <div className="w-full flex items-center justify-between">
                    <p className="text-black text-xl font-semibold">Total</p>
                    <p className="text-black text-xl font-semibold">$ 11</p>
                </div>
                <motion.button
                    
                    whileTap={{scale: 0.8}} className="w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-white text-lg my-2  hover:shadow-lg">Check Out</motion.button>
            </div>

            
         </div>
         
    </motion.div>
  )
}

export default CartContainer