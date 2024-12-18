import { getcollegeUserData } from "./CollegeStore";

export const isAuthenticated = ()=>{
    return getcollegeUserData()!=null?true:false;
}