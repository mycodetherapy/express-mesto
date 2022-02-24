const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
