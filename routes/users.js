const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");
const router = require("express").Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", express.json(), createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
