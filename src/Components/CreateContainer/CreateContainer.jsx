import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { motion } from "framer-motion"
import React, { useState } from 'react'
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from "react-icons/md"
import { storage } from "../../firebase.config"
import { categories } from "../../utlis/data"
import { saveItem } from "../../utlis/firebaseFunctions"
import Loader from "../../utlis/Loader"


const CreateContainer = () => {

  const [title,setTitle] = useState('')
  const [calories,setCalories] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState(null)
  const [fields,setFields] = useState(false)
  const [image, setImage] = useState(null)
  const [alert,setAlert] = useState('')
  const [msg,setMsg] = useState(null)
  const [isLoading,setIsloading] = useState(false)

  const uploadImage = (e) => {
    setIsloading(true)
    const imgFile = e.target.files[0]
    const storageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`)
    const uploadEvent = uploadBytesResumable(storageRef, imgFile);
    
    uploadEvent.on('state_changed', (snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
    }, (error) => {
      console.log(error)
      setFields(true)
      setMsg("error while uploading, try again")
      setAlert("danger")
      setTimeout(() => {
        setFields(false)
        setIsloading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadEvent.snapshot.ref).then(downloadURL => {
        setImage(downloadURL)
        setIsloading(false)
        setFields(true)
        setMsg("image upload sucess")
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }

  
  const deleteImage = () => {
    setIsloading(true);
    const deleteRef = ref(storage, image)
    deleteObject(deleteRef).then(() => {
      setImage(null)
      setIsloading(false)
      setFields(true)
      setMsg("image deleted")
      setAlert("success")
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }

  
  const saveDetails = () => {
    setIsloading(true)
    try {
      
      if((!title || !image || !price || !category)) {

        setFields(true)
        setMsg("Required all fields")
        setAlert("danger")
        setTimeout(() => {
          setFields(false)
          setIsloading(false)
        }, 4000)
      } else {
        const data = {
          id : `${Date.now()}`,
          title: title,
          imageUrl: image,
          qty: 1,
          category,
          price
        }
        saveItem(data)
        setFields(true)
        setMsg("data uploaded successfully")
        setAlert("success")
        clearData()
        setTimeout(() => {
          setFields(false)
          setIsloading(false)
        
        }, 4000)
      }

    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg("error while uploading, try again")
      setAlert("danger")
      setTimeout(() => {
        setFields(false)
        setIsloading(false)
      }, 4000)
    }
  }

  const clearData = () => {
    setTitle("")
    setImage(null)
    setCalories("")
    setPrice("")
    setCalories("")
   
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-400 rounded-lg p-4 my-4 flex-col items-center justify-center space-y-4'>
          {fields && (
            <motion.p 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alert === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-green-300 text-green-800"
            }`}>
                {msg}
            </motion.p>
          )}

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-xl text-gray-800"/>
            <input type="text" required value={title} placeholder='Give me a title'
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <div className="w-full">
            <select onChange={(e) => setCategory(e.target.value)}
              className="outline-none w-full border-b-2 border-gray-500 p-2 rounded-lg cursor-pointer">
              <option value='other' className="bg-white">Select Category</option>
              {categories &&
                categories.map((item) => (
                  <option key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.ulrParamName}
                  >
                    {item.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-500 w-full h-225 md:h-420 cursor-pointer rounded-lg">
            {isLoading ? <Loader/>
            : <>
                {!image ? <>
                  <label  className="w-full h-full flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700"/>
                      <p className="text-gray-500 text-3xl hover:text-gray-700"> Click Here To Upload</p>
                    </div>
                    <input className="w-0 h-0" type='file' name="uploadImage" accept="image/*" onChange={uploadImage}/>
                  </label>
                  </> : 
                  <> 
                    <div className="relative h-full">
                      <img src={image} alt="uploadimage" className="w-full h-full object-cover"/>
                      <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}><MdDelete className="text-white"/></button>
                    </div>
                    
                  </>}
            </>}
          </div>

          <div className="w-full flex flex-col md:flex-row  items-center gap-3">
            <div className="w-full py-2 border-b border-gray-500 flex items-center space-x-6">
              <MdFoodBank className="text-5xl text-gray-700"/>
              <input text="text" required placeholder="Calories"
              value={calories}
              onChange={(e)=> setCalories(e.target.value)}
               className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"/>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row  items-center gap-3">
            <div className="w-full py-2 border-b border-gray-500 flex items-center space-x-6">
              <MdAttachMoney className="text-5xl text-gray-700"/>
              <input text="text" required placeholder="Price"
               value={price}
               onChange={(e)=> setPrice(e.target.value)}
               className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"/>
            </div>
          </div>
          <div className="flex items-center w-full">
            <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg" onClick={saveDetails}>Save</button>
          </div>
      </div>
    </div>
  )
}

export default CreateContainer