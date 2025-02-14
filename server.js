import express from 'express';
import mysql from "mysql2/promise";
import { Resend } from 'resend';
import dotenv from 'dotenv';

import connectDB from '.app/config/db.js'
import emailRoute from './app/routes/emailRoute.js'


// Deployment configuration
//configure env file in dev mode
dotenv.config()

// Connect to database
connectDB()



// Initialize Resend API
const resend = new Resend(process.env.RESEND_API_KEY);