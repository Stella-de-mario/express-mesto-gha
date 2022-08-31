const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/:userId', getUserId);
router.post('/users', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
