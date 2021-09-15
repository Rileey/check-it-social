import app from './server.js';
import databaseConnection from './database/index.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8800;


databaseConnection.getConnect()




app.listen(port, () => {
    console.log(`Server listening to port http://localhost:${port}`);
});