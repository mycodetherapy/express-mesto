const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
//const auth = require('../middlewares/auth');
const validateRegisterBody = require('../middlewares/validation')

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUserById);
router.patch('/me', validateRegisterBody, updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
