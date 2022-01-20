import prisma_lib from '@prisma/client'
import express from 'express'
import fs from 'fs';
import cors from 'cors';

const { PrismaClient } = prisma_lib

import comic_router from './comic.js'

const prisma = new PrismaClient()
const app = express()

const conf_data = fs.readFileSync('./conf.json', 'utf-8');
const conf = JSON.parse(conf_data);

app.use(cors({
  origin: conf.origin
}));

// Home service page
app.get('/', (req, res) => {
  res.send("Home")
});

//Set the routers
app.use('/comic', comic_router);


app.listen(conf.port, () => {
    console.log('Server ready at: http://localhost:' + conf.port);
});
