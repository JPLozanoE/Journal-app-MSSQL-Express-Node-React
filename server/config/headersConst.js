const express = require('express'); //*
const router = express.Router(); //*

const PORT = 4000;

const path = require('path'); //*
const cookieParser=require('cookie-parser'); //*
const logger = require('morgan'); //*
// Logger:Morgan

const dotenv = require('dotenv');
const cors = require('cors');
const sql = require('mssql');


dotenv.config();

module.exports={
    express,
    router,
    sql,
    PORT,
    path,
    cookieParser,
    cors,
    logger
}