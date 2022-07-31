import { motion } from "framer-motion"
import { useEffect, useState } from "react"


import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RiRefreshFill } from "react-icons/ri"

import { v4 as uuidv4 } from 'uuid'
import EmptyCart from "../../assets/emptyCart.svg"
import { actionType } from "../../context/reducer"
import { useStateValue } from "../../context/StateProvider"
import CartItems from "../CartItems/CartItems"




const CartContainer = () => {

    const [{cartShow, cartItems, user},dispatch] = useStateValue();
    const [total, setTotal] = useState()
    const [flag, setFlag] = useState(0)
 

   

    const showCart = ()=> {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }
    useEffect(() => {
        let totalPrice = cartItems.reduce(function (acc, item) {
            return acc + item.qty * item.price
        },0)
        setTotal(totalPrice)
      
    },[flag, cartItems])


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
            <motion.p whileTap={{scale: 0.75}} className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base">Clear <RiRefreshFill onClick={() => dispatch({type: actionType.SET_CART_ITEMS, cartItems: [...cartItems, 0]})} className="text-textColor text-3xl"/></motion.p>
        </div>
                        {/* Bottom section */}
        {cartItems && cartItems.length > 0 ? (
             <div className="w-full h-full bg-primary rounded-t-[2rem] flex flex-col">

                <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                            {/* cart items */}
    
                    {cartItems && cartItems.map((e) => (
                        <CartItems flag={flag} setFlag={setFlag} total={total} data={e} key={uuidv4()}/>
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
                     <p className="text-black text-xl font-semibold">$ {total}</p>
                 </div>
                 {user && user ? (
                    <motion.button
                    whileTap={{scale: 0.8}} className="w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-white text-lg my-2  hover:shadow-lg">Check Out</motion.button>
                 ): <motion.button
                 whileTap={{scale: 0.8}} className="w-full p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-white text-lg my-2  hover:shadow-lg">Login to checkout</motion.button>}
                    
             </div>
 
             
          </div>
        ):
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <img src={EmptyCart} alt="empty-cart"/>
            <p className="text-xl text-textColor font-semibold">Add Some items to your cart</p>
        </div>}
        
         
    </motion.div>
  )
}

export default CartContainer