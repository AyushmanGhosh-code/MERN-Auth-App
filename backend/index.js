const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const authRouter = require('./routes/user');
app.use('/api/v1',authRouter);

const db = require('./config/database');
db.dbConnect();

const PORT = process.env.PORT || 3000

app.listen(PORT,() => console.log(`App is listening at ${PORT}`));