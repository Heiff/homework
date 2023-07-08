const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors')
const routes = require('./routes/index')
const FileUpload = require('express-fileupload')

const port = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${process.cwd()}/images`));
app.use(FileUpload());
app.use('/',routes)

app.listen(port,()=>{
    console.log(port);
})