const express = require('express');
const router = express.Router();

// Require the controllers 
const object_controller = require('../controllers/object.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', object_controller.test);
module.exports = router;