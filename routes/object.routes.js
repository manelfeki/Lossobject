const express = require('express');
const router = express.Router();

// Require the controllers 
const object_controller = require('../controllers/object.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/add', object_controller.object_add);
router.get('/all', async (req, res) => {
    var variable = await object_controller.getLostObjects();
    res.render('index', {
        title: "Object List",
        data: variable
    })
});

module.exports = router;