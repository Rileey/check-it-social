import express from 'express';
import cors from 'cors';



import userRoute from './routes/userRoute.js';
// import productRoutes from './routes/index.js';


const app = express();


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true}));



app.get('/', (req, res) => {
    res.json({message: 'server is ready'});
})


// routes 
app.use('/api', userRoute);
// app.use('/', productRoutes);


export default app;