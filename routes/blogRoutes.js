const express = require("express")
const blogController = require("../controllers/blogController")
const protect  = require("../middlewares/authMiddleware")

const router = express.Router();

router.route('/').get(blogController.getBlogs).post(protect, blogController.createBlog)
router.route('/:id').get(protect, blogController.getBlogById).put(protect, blogController.updateBlog).delete(protect, blogController.deleteBlog)

module.exports = router;