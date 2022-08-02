import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid'
import { actionType } from '../../context/reducer'
import { useStateValue } from "../../context/StateProvider"

const CartItems = ({data, flag, setFlag}) => {

    const [qty, setQty] = useState(1)
    const [items, setItems] = useState([])
    const [{ cartItems},dispatch] = useStateValue();

    const actionTyp = {
        ADD : "ADD",
        REMOVE : "REMOVE"
    }

    const cartDispatch = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems : items
        })
    }
 
    const updateQty = (action, id) => {


        switch (action) {
            case actionTyp.ADD :
                
                cartItems.map((item) => {
                            setQty(prev => prev + 1)
                            if(item.id === id) {
                                item.qty +=1
                                setFlag(prev => prev +1)   
                            }
                            
                        })
                        cartDispatch()
                        
                        
                 
                break;
                
            case actionTyp.REMOVE :
                cartItems.map((item) => {
                    setQty(prev => prev - 1)
                    if(item.id === id) {
                        if(item.qty < 2) {
                           
                            
                        } else {
                            item.qty -=1
                            setFlag(prev => prev +1) 
                        }
                         
                    }
                   
                })
                cartDispatch()
                break;
                        
            default: return console.log(qty)

        }
        // if(action === "add") {
        //     // eslint-disable-next-line array-callback-return
        //     cartItems.map((item) => {
        //         setQty(prev => prev + 1)
        //         if(item.id === id) {
        //             item.qty +=1
        //             setFlag(prev => prev +1)   
        //         }
                
        //     })
        //     cartDispatch()
        //     console.log("add")
           
        // } else if (action === "remove") {
        //     cartItems.map((item) => {
        //         setQty(prev => prev - 1)
        //         if(item.id === id) {
        //             item.qty -=1
        //             setFlag(prev => prev +1)   
        //         }
                
        //     })
        //     cartDispatch()
        //         }
        
        // else {
        //     if(qty === 1) {
        //         setItems(cartItems.filter((e) => e.id !== id))
        //     }
        // }      
        }
               
            
        
    
    useEffect(() => {
        setItems(cartItems)
    }, [qty, cartItems])
  return (
  
          <div key={uuidv4()} className="w-full p-1 px-2 rounded-lg bg-cardOverlay flex items-center gap-2 text-white">
                        <img src={data.imageUrl} alt="" className="w-20 h-20 max-w-[60px] object-contain rounded-full "/>
    
                        {/* name section */}
                        <div className="flex flex-col gap-1">
                            <p className="text-base text-black">{data.title}</p>
                            <p className="text-black text-sm font-semibold">${parseFloat(data.price * data.qty)}</p>
                        </div>
    
                        {/* button */}
                        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                            <motion.div whileTap={{scale: 0.75}}  onClick={() =>updateQty(actionTyp.REMOVE, data.id)}>
                                <BiMinus className="text-black text-xl"/>
                            </motion.div>
                            <p className="w-5 h-5 bg-red-500 text-sm flex items-center justify-center rounded-full">{data.qty}</p>
                            <motion.div whileTap={{scale: 0.75}} onClick={() => updateQty(actionTyp.ADD, data.id)}>
                                <BiPlus className="text-black text-xl"/>
                            </motion.div>
                        </div>
                    </div>
  
  )
}

export default CartItems