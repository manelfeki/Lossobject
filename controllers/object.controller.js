const Object = require('../models/object.model');
const mongoose = require('mongoose');
var lostObjects;

// Add new object
exports.object_add = function (req, res) {
    let lostobject = new Object(
        {
            name: req.body.name,
            lossAddress: req.body.lossAddress,
            contact: req.body.contact
        }
    );

    lostobject.save(function (err) {
        if(!err)
            res.redirect('all')
        else
            res.send(err)
    })
};

// Find all the objects
async function getLostObjects(page) {
    var perPage = 3
    lostObjects = await Object.find({})
                              .skip((perPage * page) - perPage)
                              .limit(perPage);
}

// Export getLostObjects
exports.getLostObjects = async function (page) {
    await getLostObjects(page);
    return lostObjects;
}