const express = require('express')
const cors = require('cors')
const mongoose = require ('mongoose');
const professor_controller = require ('./professor_controller')


const app = express();



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://alessandra-vataro:alessandra-vataro@cluster0.xroll.mongodb.net/cadastro?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })



app.use('/professores', professor_controller)

app.listen(3000)