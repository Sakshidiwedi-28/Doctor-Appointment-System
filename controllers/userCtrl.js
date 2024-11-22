const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register Callback
const registerController = async(req,res) => {
try {
    const existingUser = await userModel.findOne({email:req.body.email})
    if(existingUser) {
        return res.status(200).send({message:'User already Exist', success:false});
    }
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    req.body.password = hashedPassword
    const newUser = new userModel(req.body)
    await newUser.save()
    res.status(201).send({message: "Register Successfully", success: true});
} catch (error) {

    console.log(error)
    res.status(500).send({success:false, message: `Register  Controller ${error.message}`})
  }
};

// login callback
const loginController = async (req, res) => {
    try {
         const user = await userModel.findOne({email:req.body.email});
         if(!user) {
            return res.status(200).send({message:'user not found', success:false});
         }
         const isMatch = await bcrypt.compare(req.body.password, user.password);
         if(!isMatch) {
            return res.status(200).send({message:"Invalid Email or Password",success:false});
         }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'1d'});
        res.status(200).send({message:'Login Success',success:true, token});
    } catch (error){
        console.log(error)
        res.status(500).send({message:`Error in login CTRL ${error.message}`});
    }
};

const authController =  async(req,res) => {
 try {
   const user = await userModel.findOne({_id:req.body.userId})
   if(user){
    return res.status(200).send({
        message:'user not found',
        success:false,
        data:{
            name:user.name,
            email:user.email,
        },
    });
   }
 } catch(error) {
    console.log(error)
    res.status(500).send({
        message: 'auth error',
        success:false,
        error
    });
 }
};

// Placeholder for missing controllers
const applyDoctorController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'Apply Doctor Controller', success: true });
};

const getAllNotificationController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'Get All Notifications Controller', success: true });
};

const deleteAllNotificationController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'Delete All Notifications Controller', success: true });
};

const getAllDocotrsController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'Get All Doctors Controller', success: true });
};

const bookeAppointmnetController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'Book Appointment Controller', success: true });
};

const bookingAvailabilityController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'Booking Availability Controller', success: true });
};

const userAppointmentsController = async (req, res) => {
    // Implement logic here
    res.status(200).send({ message: 'User Appointments Controller', success: true });
};

module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDocotrsController,
    bookeAppointmnetController,
    bookingAvailabilityController,
    userAppointmentsController
};
