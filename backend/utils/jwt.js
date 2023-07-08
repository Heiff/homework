const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.Secret;

const Sign = async(id) =>{
const token = await jwt.sign(id,secret)
return token
}

const Verify = async(id) => {
    const token = await jwt.verify(id,secret)
    return token
}

module.exports = {
    Sign,
    Verify
}