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
        if (err) {
            return next(err);
        }
        res.send('object Created successfully')
    })
};

// Find all the objects
async function getLostObjects() {
    lostObjects = await Object.find({});
}

// Export getLostObjects
exports.getLostObjects = async function () {
    await getLostObjects();
    return lostObjects;
}