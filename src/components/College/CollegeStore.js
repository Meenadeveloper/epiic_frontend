export const storecollegeUserData = (data)=>{
    localStorage.setItem('collegetoken', data)
}

export const getcollegeUserData = ()=>{
   return  localStorage.getItem('collegetoken');
}