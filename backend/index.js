const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const textRoutes = require('./Routes/textRoutes');
const connectDB = require('./Config/db')

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

connectDB();

app.use('/api/assistant',textRoutes);

app.get('/',(req,res)=>{
    res.send("Working...");
})

app.listen(PORT,()=>{
    console.log("Running fine at",PORT);
})
