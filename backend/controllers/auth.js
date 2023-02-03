const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createuser = async (req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword =  await bcrypt.hash(req.body.password,salt);

        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPassword
        });
        
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '30d'});
        res.status(200).json({message:'user created',token});
    } catch (error) {
        if(error.code === 11000 && error.keyPattern.email === 1){
           return res.status(400).json({error:'Please enter a unique email'});
        }
        //res.send(error)
       //console.log(error);
        res.status(500).json(error);
        
    }
}//createuser endpoint

const login = async (req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error:'Please try to login with correct credentials'});
        }

        const passwordCompare =  await bcrypt.compare(password,user.password);

        if(!passwordCompare){
            return res.status(400).json({error:'Please try to login with correct credentials'});
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '30d'});
        res.status(200).json({message:'user login successfully',token})
    } catch (error) {
        //res.send(error)
       //console.log(error);
        res.status(500).json(error.message);
        
    }
}// login user endpoint

const getUser = async(req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password -_id -__v");
        res.status(200).json({message:'user info',user})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
}



module.exports ={
    createuser,
    login,
    getUser
}