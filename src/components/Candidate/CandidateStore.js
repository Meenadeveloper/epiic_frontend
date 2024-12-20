export const storecandidateUserToken = (data)=>{
    localStorage.setItem('candidatetoken', data)
}

export const candidateUserToken = ()=>{
   return  localStorage.getItem('candidatetoken');
}