const express = require('express');

const v1Routes = require('./v1');

const router = express.Router();

console.log("inside v1 Routes")


router.use('/v1', v1Routes);

module.exports = router;