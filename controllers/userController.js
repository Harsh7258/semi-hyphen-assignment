const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const firebaseDB = require("../utils/db");
const AppError = require("../utils/appError");

const signup = async (req, res, next) => { 
    const { name, email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 8)
    const userRef = firebaseDB.collection('Users').doc(email) 

    try {
        await userRef.set({ name, email, password: hashedPassword });
        res.status(201).json({
            status: 'success',
            message: 'User created successfully'
        });
      } catch (error) {
        return next(new AppError(`Error creating document: ${error.message}`, 500))
      }
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    const userRef = firebaseDB.collection('Users').doc(email)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
        return next(new AppError('User not found', 404));
    }

    const user = await userDoc.data()
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return next(new AppError('Invalid password. Please try again', 401));
    }

    try {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            status: 'success',
            token,
            message: "Logged In succesfully."
        });
    } catch (error) {
        return next(new AppError(`Error in token creation: ${error.message}`, 400))
    }
}

const logout = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new AppError('Token is required', 400));
    }

    // Add the token to a blacklist
    const blacklistedTokensRef = firebaseDB.collection('blacklistedTokens').doc(token);
    try {
        await blacklistedTokensRef.set({ token });
        res.status(200).json({
            status: 'success',
            message: 'Logout successful'
        });
    } catch (error) {
        return next(new AppError(`Server Error, Logout again: ${error.message}`, 500));
    }
}

const deleteUser = async (req, res, next) => {
    const { email } = req.user; // user will be added by the protect middleware

    const userRef = db.collection('Users').doc(email);

    try {
        await userRef.delete();
        res.status(200).json({
            status: 'success',
            message: 'User deleted'
        });
    } catch (error) {
        return next(new AppError(`Server error, Try again${error.message}`, 500));
    }
}

module.exports = { login, signup, deleteUser, logout }