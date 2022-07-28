import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CreateContainer from "./Components/CreateContainer/CreateContainer";
import Header from "./Components/Header/Header";
import MainContainer from "./Components/Main/MainContainer";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utlis/firebaseFunctions";
function App() {


  const [{foodItems}, dispatch] = useStateValue();
  console.log(foodItems)
  
  const fetchData =  () => {
    getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }
  
  useEffect(() => {
    
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
    <div className="w-screen h-auto flex flex-col bg-bagroundColor text-textColor">
      <Header/>
      <main className="mt-14 md:mt-20 md:px-16 w-full ">
        <Routes>
            <Route path="/*" element={<MainContainer/>}/>
            <Route path="/createItem" element={<CreateContainer/>}/>
        </Routes>
      </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
