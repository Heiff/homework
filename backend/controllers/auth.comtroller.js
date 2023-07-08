const pg = require('../db/pg');
const { passHash, passCompare } = require('../utils/bcrypt');
const { Sign,Verify } = require('../utils/jwt')
const Register = async(req,res)=>{
try {
    const { username,password } = req.body;
    console.log(req.body);

    const findUser = await pg("select * from auth where username = $1",username);

    if (findUser.length) {
        return res.status(403).json({message:'username bor'})
    }
    const hashPass = await passHash(password);
    const newUser = (await pg("insert into auth(username,password)values($1,$2) returning *",username,hashPass))[0];
    res.status(201).json({message:"succes register" ,data:newUser})
} catch (error) {
    res.status(400).json({message:error})
}
}

const Login = async(req,res) => {
try {
    const { user,pass } = req.body;
    console.log(req.body);
    const findUser = (await pg("select * from auth where username = $1",user))[0];
    console.log(findUser);
    if (!findUser) {
        return res.status(403).json({message:'not user'})
    }
    const compare = await passCompare(pass,findUser.password)
    
    if(!compare){
        return res.status(403).json({message:'Incorrent password or username'})
    }
    const token = await Sign(findUser.id);
    res.status(200).json({token:token})
} catch (error) {
    res.status(400).json({message:error})
}
}

const Auth = async(req,res,next) => {
    const findUser = (await pg("select * from auth"))[0];
        console.log(findUser);
        try {
          const token = req.cookies.token;
          let yes = true
          const verify = jwt.verify(token);
          console.log(verify);
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == verify.userId) {
              yes = false
              next();
            }
            
          }
          if(yes) {
            res.redirect('/')
          }
         
        } catch (error) {
          res.redirect("/");
        }
     
}

module.exports = {
    Register,
    Login,
    Auth
}