const express = require('express')


const{
    // fetchProfile,
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    loginStudent,
} = require('../controllers/LearnerController')

// const requireAuth = require('../middleware/requireStudentAuth')


const router = express.Router()

//login Staff member
router.post('/login', loginStudent)

//GET a single Staff member
router.get('/:id', getStudent)

//UPDATE a Staff member
router.patch('/:id', updateStudent)

//requiring admins auth
//router.use(requireAuth)

//GET all Staff
router.get('/', getStudents)



// router.get('/profile', auth, async (req, res) => {
//     try {
//       const user = await Staff.findById(req.user.user_id, '-password');
//       if (!user) {
//         return res.status(404).json({ msg: 'User not found' });
//       }
//       res.json(user);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   })

//POST a new Staff member
router.post ('/', createStudent)



//DELETE a Staff member
router.delete('/:id', deleteStudent)



module.exports = router