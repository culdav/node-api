import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhh_secret = 'doggy';
  next();
});

app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
  // throw new Error('hello');
});

// app.get('/', (req, res, next) => {
  // console.log('hello from express');
  // res.status(200);
  // res.json({ message: 'hello' });
  // setTimeout( () => {
  //   next(new Error('hello'));
  // }, 1);
// });

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
  if(err.type === 'auth') {
    res.status(401).josn({message: 'Unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'Invalid input'}); 
  } else {
    res.status(500).json({message: 'Internal error'});
  }
})
export default app;
