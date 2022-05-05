import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";

import adminRouters from './routes/adminRouters.js'
import instructorRouters from './routes/instructorRouters.js'
import userRouters from './routes/userRouters.js'
import studentsRouters from './routes/studentsRouters.js'

dotenv.config()
connectDB()
const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors())

app.use('/api/users', userRouters)
app.use('/api/students', studentsRouters)
app.use('/api/instructors', instructorRouters)
app.use('/api/admin', adminRouters)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT} `))