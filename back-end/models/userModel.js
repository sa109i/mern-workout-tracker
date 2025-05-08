
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

function validation(email, password) {
    if(!email || !password) {
        throw Error("All fields must be filled ")
    }

    if(!validator.isEmail(email)) {
        throw Error("Invalid Email!")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Weak Password!")
    }
}

userSchema.statics.signup = async function (email, password) {
    // validation
    validation(email, password)

    const exists = await this.findOne({ email })

    if(exists) {
        throw new Error("email already in use login instead!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash })
    return user
}

userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw Error("All fields must be filled ")
    }

    if(!validator.isEmail(email)) {
        throw Error("Invalid Email!")
    }

    const user = await User.findOne({ email })

    if(!user) {
        throw Error("User doesn't exist!")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect Password!")
    }

    return user
}

const User = mongoose.model('user', userSchema);

module.exports = User;