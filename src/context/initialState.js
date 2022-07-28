import { fetchCart, fetchUser } from "../utlis/fetchLocalStorageData"

const userInfo = fetchUser()
const cartInfo = fetchCart()
export const initailState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo
    
}