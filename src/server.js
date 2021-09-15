import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import multer from 'multer';
import path from 'path';

dotenv.config();



const __dirname = path.resolve()
const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const storage = multer.diskStorage({
    getDestination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    getFilename: (req, file, cb) => {
        const { name } = req.body;
        cb(null, name)
    }
})

const upload = multer({storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (err) {
        console.log(err)
    }
})

app.get('/', (req, res) => {
    res.json({message: 'server is ready'});
})


// routes 
app.use('/api', userRoute);
// app.use('/', productRoutes);


export default app;