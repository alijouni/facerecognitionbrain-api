import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImage from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '2601428692',
      database : 'smart_brain'
    }
});
  
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Success');
})

app.post('/signin', (req,res)=>{handleSignin(req,res,db,bcrypt)});
// Clean code more
// app.post('/signin', handleSignin(db,bcrypt));
//Add to signin.js: const handleSignin=(db,bcrypt) => (req,res) => { 
app.post('/register', (req,res)=>{handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res)=>{handleProfileGet(req,res,db)});

app.put('/image', (req,res)=>{handleImage(req,res,db)});

app.listen(3001, () => {
    console.log("app is running on port 3001");
})