const express = require('express');
const router = express.Router();
const Object = require('../models/object.model');
// Require the controllers 
const object_controller = require('../controllers/object.controller');


// Routing into add.pug
router.get('/add', (req, res) => { res.render('add'); });

// Routing into the object_controller in order to execute getLostObjects and return all the objects
router.get('/all', async (req, res) => {
    var variable = await object_controller.getLostObjects();
    res.render('index', {
        data: variable
    })
});

// Routing into the object_controller in order to execute object_add and add the object
router.post('/addObject', (req, res) => {
    object_controller.object_add(req,res);
});

/* Routing into the object_controller in order to execute getLostObjects and return all the objects 
with pagination */
router.get('/all/:page', async function(req, res, next) {
                var page=await (req.params.page || 1)
                var perPage = 3
                var variable = await object_controller.getLostObjects(page);
                Object.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('index', {
                        current: page,
                        pages: Math.ceil(count / perPage),
                        data: variable
                    })
                })
            })
module.exports = router;