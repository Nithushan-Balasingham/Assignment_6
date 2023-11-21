const asyncHandler = require("express-async-handler")
const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const addNewUser = asyncHandler(async(req,res)=>{
        const{name, email,password} = req.body
        if(!name || !email || !password){
            res.status(400)
            throw new Error("All fields are mandatory")
        }
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            res.status(400).send({message:"Already Registered"})
            throw new Error("User already Registered")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        console.log("Hashed Password" , hashedPassword)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        if(user){
            res.status(201).json({_id:user.id, email:user.email, name:user.name})
        }else{
            res.status(400);
            throw new Error("User data is not valid")
        }
        res.json({message:"Register the User"})
      }
)

const loginUser = asyncHandler(async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken = jwt.sign(
                {
                    user:{
                        name:user.name,
                        email:user.email,
                        id:user.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET
                )

                res.status(200).json({accessToken,userName:user.name,userEmail:email,userId:user.id})
            
        }else{
            res.status(401).json({message:"Incorrect email or password"})
        }
    } catch (error) {
        console.log(error);
    }
})



const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id);
      if (!user) {
        res.status(404);
        throw new Error('Not found');
      }
    }
  
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
  
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  });


const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
   
    const user = await User.findById(id);
    
    if (!user) {
      res.status(404);
      throw new Error("Not found");
    }
    res.status(200).json(user);
  }
});
const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await User.findByIdAndDelete(userId);

  res.json({ message: 'User account and associated blogs deleted successfully.' });
});

module.exports={
    addNewUser,
    loginUser,
    updateUser,
    getSingleUser,
    deleteUserAccount

}