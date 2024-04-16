const express = require('express');


const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

console.log("inside api Routes")
// parsing
app.use(express.json());
// read urlencoded char
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);
// Logger.info("succesfully started the server ",{})

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    })






