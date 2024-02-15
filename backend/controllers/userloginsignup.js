const asyncHandler = require('express-async-handler')

const loginhandle=asyncHandler((req,res)=>{
    const {name,username,email,password,profilepic}=req.body
})
const signuphandle=asyncHandler((req,res)=>{
    
})

module.exports={loginhandle,signuphandle}