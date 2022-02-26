const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validationUpdateUser, validationUpdateAvatar, validationUserId } = require('../validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validationUserId, getUserById);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
