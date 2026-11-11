const cors = require('cors');
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const noteRoute = require('./Routes/noteRoutes');
const errorHandler = require('./Middleware/errorHandler');
const authRoutes = require('./Routes/authRoutes');
const app = express();
app.use(cors());

const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Note API is running");
});

app.use('/api/notes', noteRoute);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB is Connected");
        app.listen(PORT, () => {
            console.log("Server is running at 5000");
        });
    })
    .catch((err) => {
        console.log("Error: ", err);
    });