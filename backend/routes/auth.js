const express=require('express');
const router=express.Router();

// importing express-validator
const { body, validationResult } = require('express-validator');

// importing bcrypt js
const bcrypt = require('bcryptjs');

const JWT_Secret="PushkarIs$goodstudent";

// importing middleware fetchuser from middleware folder

const fetchuser=require('../middleware/fetchuser');

// importing JWT token

const JWT=require('jsonwebtoken');

//const jwtdecode=require('jwt-decode');

 

const User=require('../models/User');


// Route 1 :Create a User using : Post "/api/auth/createuser".No Login required

router.post("/createuser",[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be min 5 characters long').isLength({ min: 5 }),
], async(req,res)=>{
     let success=false;
    // Check for errors and send bad request with errors..
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check whether the user with same email already exists 
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:'User with this email already exists'});
    }
     
    const salt=bcrypt.genSaltSync(10);
    const secPass=await bcrypt.hash(req.body.password,salt);

     user=await User.create({            // creating a user in database
        email:req.body.email,
        name: req.body.name,
        password: secPass,
      })
    
      const data={
        user:
        {
            id:user.id
        }
    }
    
    const authtoken=JWT.sign(data,JWT_Secret);
    
    //   .then(user => res.json(user)).
    //   catch(err=>{console.log(err);
    //   res.json({error:'Please enter a unique value for email'})});
    success=true;
    res.json({success,authtoken})}
    catch(err){
        console.error(err.message)
        res.status(500).send("Some Error Occurred");

    }

   
})

// Route 2 : Authenticate a user using POST  "/api/auth/login" . Login required

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),],
    async(req,res)=>{

        let success=false;

    // Check for errors and send bad request with errors..
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;  // Destructuring : extracting email and pass from req.body...

    try{
 
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,"error":"Please try to Login using correct credentials"});
        }

        const comparePass=await bcrypt.compare(password,user.password);
        if(!comparePass){
            success=false;
            return res.status(400).json({success,"error":"Please try to Login using correct credentials"}); 
        }

        const data={
            user:
            {
                id:user.id
            }
        }
        
        const authtoken=JWT.sign(data,JWT_Secret);
        success=true;
        res.json({success,authtoken});

    }catch(err){
    
        console.error(err.message)
        res.status(500).send("Internal server Error Occurred");

    }

})


// Route 3 : Get LoggedInuser details using POST  "/api/auth/getuser" . Login required

router.post('/getuser',fetchuser,async(req,res)=>{

    try{
       
        userId=req.user.id;
        let user=await User.findById(userId).select("-password");  // This will return all field except password
        res.json({user});

    }catch(err){

        console.error(err.message)
        res.status(500).send("Internal server Error Occurred");
   
    }

})


module.exports=router;
