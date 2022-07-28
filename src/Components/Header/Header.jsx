import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { CgAdd, CgLogOut, CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";
import Avatar from '../../assets/avatar.png';
import Logo from "../../assets/logo.png";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { app } from "../../firebase.config";

const Header = () => {
const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();
const [{user, cartItems, cartShow}, dispatch] = useStateValue()
const [isMenu, setIsMenu] = useState(false)


  const login = async() => {
   if(!user) {
    const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0]
    })

    localStorage.setItem('user', JSON.stringify(providerData[0]))
   } else {
    setIsMenu(!isMenu)
   }

  }
  const logout = () => {
    setIsMenu(false)
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    })
  }
  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:px-16 bg-bagroundColor'>
         {/* desktop and tablet */}
        <div className='hidden md:flex w-full h-ful '>
          <Link to={"/"} className='flex items-center gap-2'>
            <img src={Logo} alt="logo" className='w-10 object-cover'/>
            <p className='text-headingColor text-xl font-bold'>City</p>
          </Link>

          <motion.ul 
           initial={{opacity: 0, x: 200}}
           animate={{opacity: 1, x: 0}}
           exit={{opacity: 0, x: 200}}
           className='flex items-center gap-8 ml-auto'>
            <li className="text-base text-textColor hover:text-red-600 duration-300 transition-all ease-in-out cursor-pointer">Home</li>
            <li className="text-base text-textColor hover:text-red-600 duration-300 transition-all ease-in-out cursor-pointer">Menu</li>
            <Link to={'/createItem'} className="text-base text-textColor hover:text-red-600 duration-300 transition-all ease-in-out cursor-pointer">About us</Link>
            <li className="text-base text-textColor hover:text-red-600 duration-300 transition-all ease-in-out cursor-pointer">Service</li>
          </motion.ul>
          <div className='flex items-center justify-center relative' onClick={showCart}>
                <CgShoppingCart className='text-textColor text-2xl ml-8 cursor-pointer'/>
                 {cartItems && cartItems.length > 0 && (
                   <div className='absolute top-0 right-0 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center'>
                   <p className='text-sm text-white'>{cartItems.length}</p>
                 </div>
                 )}
          </div>

          <div className="relative">
             
              
              <motion.img onClick={login} whileTap={{scale: 0.8}} src={user ? user.photoURL : Avatar} alt='User-img'className='ml-8 w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow rounded-full' referrerPolicy="no-referrer"/>
              {isMenu ? (
                <motion.div
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 1}}
                className="w-40 bg-red-400 shadow-2xl rounded-lg flex flex-col absolute top-12 right-0  ">
                {user && user.email === 'arafat20203@gmail.com' && (
                    <Link to={'/createitem'} className="flex items-center justify-start hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base px-4 py-2 rounded-md cursor-pointer">
                    New Item
                    <CgAdd className="text-xl   ml-4"/>
                  </Link>
                )}


                <p className="flex items-center justify-start bg-red-500  hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base px-4 py-2 rounded-md cursor-pointer" onClick={logout}>
                  Logout
                  <CgLogOut className="text-xl ml-4"/>
                </p>
                
                
              </motion.div>
              ) : null
              }
            </div>

       
              
              
            </div>
         
       
     
     
         {/* Mobile */}
        <div className='flex items-center justify-between md:hidden'>

        
         <div className='flex items-center justify-center relative' onClick={showCart}>
                <CgShoppingCart className='text-textColor text-2xl cursor-pointer'/>
                {cartItems && cartItems.length > 0 && (
                  <div className='absolute top-0 right-0 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center'>
                   <p className='text-sm text-white'>{cartItems.length}</p>
                  </div>
                 )}
          </div>
              
          <Link to={"/"} className='flex items-center justify-center gap-2'>
            <img src={Logo} alt="logo" className='w-10 object-cover'/>
            <p className='text-headingColor text-xl font-bold'>City</p>
          </Link>

          <div className="relative ">
          
            <motion.img onClick={login} whileTap={{scale: 0.8}} src={user ? user.photoURL : Avatar} alt='User-img'className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow rounded-full'/>
            {isMenu ? (
              <motion.div
              initial={{opacity: 0, scale: 0.6}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 1}}
              className="w-40 bg-red-400 shadow-2xl rounded-lg flex flex-col absolute top-12 right-0  ">
              {user && user.email === 'arafat20203@gmail.com' && (
                  <Link to={'/createitem'} className="flex items-center justify-start hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base px-4 py-2 rounded-md cursor-pointer">
                  New Item
                  <CgAdd className="text-xl   ml-4"/>
                </Link>
              )}
              
              
              <ul className='flex flex-col    text-textColor text-base '>
                <li className="flex justify-start hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base px-4 py-2 rounded-md cursor-pointer">Home</li>
                <li className=" flex justify-start hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base px-4 py-2 rounded-md cursor-pointer">Menu</li>
                <Link to={'/createItem'} className=" flex justify-start hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base p-4 py-2 rounded-md cursor-pointer">About us</Link>
                <li className="flex justify-start hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base px-4 py-2 rounded-md cursor-pointer">Service</li>
              </ul>

              <p className="flex items-center justify-start mx-2 my-2 p-2 shadow-md bg-red-500 hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base  rounded-md cursor-pointer"
              onClick={logout}
              >
                Logout
                <CgLogOut className="text-xl ml-4"/>
              </p>
              
              
            </motion.div>
            ) : null
            }
          </div>

        
        </div>
       
    </header>
  )
}

export default Header