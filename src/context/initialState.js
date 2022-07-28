import { fetchUser } from "../utlis/fetchLocalStorageData"

const userInfo = fetchUser()
export const initailState = {
    user: userInfo,
    foodItems: null
}