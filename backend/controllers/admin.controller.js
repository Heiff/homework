const pg = require('../db/pg');
const { passHash, passCompare } = require('../utils/bcrypt');
const { Sign,Verify } = require('../utils/jwt')
const {v4:uuid} = require('uuid')

const  ExpertsGet = async(req,res) => {
    try {
        const data = await pg("select * from experts");
        res.status(200).json(data)
    } catch (error) {
        res.status(403).json({message:error})
    }
}

const StudentsGet = async(req,res) =>{
    try {
        const data = await pg("select * from studentssay");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}


const ExpertsPost = async(req,res)=>{
    try {
        const { name,field } = req.body;
        const { image } = req.files;
        console.log(req.body);
        const findCard = await pg("select * from cards where name = $1",name);
    
        if (findCard.length) {
            return res.status(403).json({message:'card bor'})
        }
        console.log(image);
        const imageName = `${uuid()}.${
            image.name.split(".")[image.name.split(".").length - 1]
          }`;
          console.log(imageName);
          image.mv(process.cwd() + `/images/${imageName}`);
        const newExpert = (await pg("insert into experts(image,name,field)values($1,$2,$3) returning *",imageName,name,field,))[0];
        res.status(201).json({message:"card posted succes" ,data:newExpert})
    } catch (error) {
        res.status(400).json({message:error})
    }
    }

const ExpertsDelete = async(req,res) =>{
    try {
        const { id } = req.params;
        await pg("delete from experts where id = $1",id)
        res.status(200).json({message:'succes deleting'})
    } catch (error) {
        console.log(error);
    }
}

const  ExpertsUpdate = async(req,res) => {
    try {
        const { id,name,field } = req.body;
        const upd = await pg("update experts set name = $1, field = $2 where id = $3",name,field,id)

        res.status(200).json(upd)
    } catch (error) {
        console.log(error);
    }
}



const  CoursesGet = async(req,res) => {
    try {
        const data = await pg("select * from popularcourses");
        res.status(200).json(data)
    } catch (error) {
        res.status(403).json({message:error})
    }
}

const CoursesPost = async(req,res)=>{
    try {
        const { field,price } = req.body;
        const { image } = req.files;
        console.log(req.body);
        const findCard = await pg("select * from popularcourses where field = $1",field);
    
        if (findCard.length) {
            return res.status(403).json({message:'course bor'})
        }
        console.log(image);
        const imageName = `${uuid()}.${
            image.name.split(".")[image.name.split(".").length - 1]
          }`;
          console.log(imageName);
          image.mv(process.cwd() + `/images/${imageName}`);
        const newCourse = (await pg("insert into popularcourses(image,price,field)values($1,$2,$3) returning *",imageName,price,field,))[0];
        res.status(201).json({message:"card posted succes" ,data:newCourse})
    } catch (error) {
        res.status(400).json({message:error})
    }
    }

const CoursesDelete = async(req,res) =>{
    try {
        const { id } = req.params;
        await pg("delete from popularcourses where id = $1",id)
        res.status(200).json({message:'succes deleting'})
    } catch (error) {
        console.log(error);
    }
}

const  CoursesUpdate = async(req,res) => {
    try {
        const { id,price,field } = req.body;
        const upd = await pg("update popularcourses set price = $1, field = $2 where id = $3",price,field,id)

        res.status(200).json(upd)
    } catch (error) {
        console.log(error);
    }
}



    module.exports = {
        ExpertsPost,
        ExpertsGet,
        ExpertsDelete,
        ExpertsUpdate,
        CoursesDelete,
        CoursesGet,
        CoursesPost,
        CoursesUpdate,
        StudentsGet
    }