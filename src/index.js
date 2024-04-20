const express = require('express');
const { rateLimit } =  require('express-rate-limit')

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

console.log("inside api Routes")
// parsing
app.use(express.json());
// read urlencoded char
app.use(express.urlencoded({extended:true}));


const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


app.use('/api', apiRoutes);
// Logger.info("succesfully started the server ",{})

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    })






