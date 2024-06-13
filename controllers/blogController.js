const AppError = require("../utils/appError")
const firebaseDB = require("../utils/db");

const getBlogs = async (req, res, next) => {
    try {
        const docRef = firebaseDB.collection('Blogs')
        const snapshot = await docRef.get()
        
        if (snapshot.empty) {
            return next(new AppError('No document found. Create one', 404))
        } else {
            const blogs = [];
            snapshot.forEach(doc => {
                blogs.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json({
                status: 'success',
                data: blogs
            });
        }
    } catch (error) {
        return next(new AppError(`Error reading document: ${error.message}, Check the server.`, 400))
    }
}

const getBlogById = async (req, res) => {
    try {
        const docRef = firebaseDB.collection('Blogs').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return next(new AppError('No document found. Create one', 404))
        } else {
          res.status(200).json({
            status: 'success',
            data: doc.data()
        });
        }
      } catch (error) {
        return next(new AppError(`Error reading document: ${error.message}, Check the server.`, 400))
      }
}

const createBlog = async (req, res) => { 
    try {
        const data = req.body;
        const docRef = await firebaseDB.collection('Blogs').add(data);
        res.status(201).json({
            status: 'success',
            data: `Document created with ID: ${docRef.id}`
        })
    } catch (error) {
        console.log(error)
        return next(new AppError(`Error reading document: ${error.message}, Check the server.`, 400))
    }
}

const updateBlog = async (req, res) => {
    try {
        const data = req.body;
        const docRef = firebaseDB.collection('Blogs').doc(req.params.id);
        await docRef.update(data);
        res.status(200).json({
            status: 'success',
            message: 'Document updated successfully'
        })
      } catch (error) {
        return next(new AppError(`Error reading document: ${error.message}, Check the server.`, 400))
      }
}

const deleteBlog = async (req, res) => {
    try {
        const docRef = firebaseDB.collection('Blogs').doc(req.params.id);
        await docRef.delete();
        res.status(200).json({
            status: 'success',
            message: 'Document deleted successfully'
        })
      } catch (error) {
        return next(new AppError(`Error reading document: ${error.message}, Check the server.`, 400))
      }
}

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog }