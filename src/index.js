const express = require('express');
const { rateLimit } =  require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');

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
	limit: 25, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)




// redirectin : Reverse proxy implementation
// applying for Flight-Service

// app.get('/flightServices',(req,res)=>{
//     return res.json({msg : "what happened"})
// })

app.use(
    '/flightServices',
    createProxyMiddleware({
      target: ServerConfig.FLIGHT_SERVICE,
      changeOrigin: true,
    }),
  );

  app.use(
    '/bookingService',
    createProxyMiddleware({
        
      target: ServerConfig.BOOKING_SERVICE,
      changeOrigin: true,
    }),
  );


// app.use(
//     '/test',
//     createProxyMiddleware({
//         target: 'https://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//     })
// );




app.use('/api', apiRoutes);
// Logger.info("succesfully started the server ",{})

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    })






