module.exports = function (router) {

    const Object = require('../models/object.model');
    // Require the controllers 
    const object_controller = require('../controllers/object.controller');
    const getLostObjects = object_controller.getLostObjects;
    const object_add = object_controller.object_add;


    // Routing into add.pug
    router.get('/objects/add', isLoggedIn, (req, res) => {
        res.render('add');
    });

    // Routing into the object_controller in order to execute getLostObjects and return all the objects
    router.get('/objects/all', isLoggedIn, async (req, res) => {
        var variable = await getLostObjects();
        res.render('index', {
            data: variable
        })
    });

    // Routing into the object_controller in order to execute object_add and add the object
    router.post('/objects/addObject', (req, res) => {
        object_add(req, res);
    });

    /* Routing into the object_controller in order to execute getLostObjects and return all the objects 
    with pagination */
    router.get('/objects/all/:page', isLoggedIn, async function (req, res, next) {
        var page = await (req.params.page || 1)
        var perPage = 3
        var variable = await getLostObjects(page);
        Object.count().exec(function (err, count) {
            if (err) return next(err)
            res.render('index', {
                current: page,
                pages: Math.ceil(count / perPage),
                data: variable
            })
        })
    })
}

// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // If user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // If he isn't redirect him to the lgoin page
    res.redirect('/login');
}