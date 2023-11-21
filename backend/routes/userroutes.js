const express = require("express")
const {addNewUser, loginUser, updateUser, deleteUserAccount, getSingleUser} = require('../controllers/userController')
const validateToken = require("../middleware/validateToken")

const router = express.Router()

router.post("/register",addNewUser)
router.post("/login",loginUser)
router.route("/:id").delete(validateToken,deleteUserAccount).get(validateToken,getSingleUser).put(validateToken, updateUser)



module.exports = router