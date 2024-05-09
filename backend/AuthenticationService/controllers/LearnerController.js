const Student = require('../models/LearnerModel');
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');


const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET, {expiresIn:'3d'})
  
  }

  //get all students
const getStudents = async(req, res) => {
    const student = await Student.find({}).sort({createdAt: -1 });

    res.status(200).json(student);
};

//get a single student 
const getStudent = async (req, res) => {

    const { id } = req.params
  
    if (!mongooose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' });
    }
  
    const student = await Student.findById(id);
  
  
  
    if (!student) {
      return res.status(400).json({ error: 'No such student' });
    }
  
    res.status(200).json(student);
    
  };


  

  
  //create a new student
  const createStudent = async (req,res) => {
    const{Name,email,username,pw} = req.body
  
    let emptyFields = []
      if(!Name){
        emptyFields.push('Name')
    }
      if(!email){
          emptyFields.push('email')
      }
      if(!username){
          emptyFields.push('username')
      }
      if(!pw){
          emptyFields.push('pw')
      }
      if (emptyFields.length > 0) {
              return res.status(400).json({error: 'Please fill all the fields', emptyFields})
          }
  
  
  
    try{
      //const user_id = req.admin._id
        
        const student = await Student.creatingStudent(Name,email,username,pw)
  
        //create token
        const token = createToken(student._id)
        const userid = student._id
        const sid = student.StudentId
        
        console.log(student);
        res.status(200).json({student,token,userid,sid})
  
    } catch(error){
        res.status(400).json({error:error.message})
  
    }
  }

  //delete a student

  const deleteStudent = async (req, res) => {
    const { id } = req.params;
  
    if (!mongooose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' });
    }
  
    const student = await Student.findOneAndDelete({ _id: id });
  
    if (!student) {
      return res.status(400).json({ error: 'No such stdunet' });
    }
  
    res.status(200).json(student);
  };

  //update staff member

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const{Name,email,username,pw} = req.body
  
    let emptyFields = []
      if(!Name){
        emptyFields.push('Name')
    }
      if(!email){
          emptyFields.push('email')
      }
      if(!username){
          emptyFields.push('username')
      }
      if(!pw){
          emptyFields.push('pw')
      }
      if (emptyFields.length > 0) {
              return res.status(400).json({error: 'Please fill all the fields', emptyFields})
          }
  
    if (!mongooose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such student' });
    }
  
    const student = await Student.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!student) {
      return res.status(400).json({ error: 'No such student' });
    }
    if (emptyFields.length == 0){
    res.status(200).json(staff);
    }
  };

  //login user 
const loginStudent = async (req,res) => {
    const {username,pw} = req.body
  
    try{
      const student = await Student.login(username,pw)
      const token = createToken(student._id)
      const userid = student._id
      const sid = student.StudentId
      const email = student.email
      
  
      res.status(200).json({username,token,userid,sid,email})
  
  } catch(error){
      res.status(400).json({error:error.message})
  
  }
  
  
    
  }
  
  const fetchProfile = async(req,res) => {
    
      const profile = await Student.profile()
  
      res.status(200).json(profile)
    
    
  }
  

  module.exports = {
    getStudent,
    getStudents,
    createStudent,
    deleteStudent,
    updateStudent,
    loginStudent,
    fetchProfile,
  };