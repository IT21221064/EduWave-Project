const express = require('express')
const Staff = require('../models/TutorModel');

const{
    fetchProfile,
    createStaff,
    getStaff,
    getStaffs,
    deleteStaff,
    updateStaff,
    loginStaff,
} = require('../controllers/TutorController')

const requireAuth = require('../middleware/RequireAdminAuth')
// const auth = require('../middleware/requireStaffAuth')


const router = express.Router()

//login Staff member
router.post('/login', loginStaff)

//GET a single Staff member
router.get('/:id', getStaff)

//UPDATE a Staff member
router.patch('/:id', updateStaff)

//requiring admins auth
// router.use(requireAuth)

//GET all Staff
router.get('/', getStaffs)

//POST a new Staff member
router.post ('/', createStaff)



//DELETE a Staff member
router.delete('/:id', deleteStaff)

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





module.exports = router