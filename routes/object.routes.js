const express = require('express');
const router = express.Router();

// Require the controllers 
const object_controller = require('../controllers/object.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/add', (req, res) => { res.render('add'); });
router.get('/all', async (req, res) => {
    var variable = await object_controller.getLostObjects();
    res.render('index', {
        data: variable
    })
});
router.post('/addObject', (req, res) => {
    object_controller.object_add(req,res);
});
module.exports = router;