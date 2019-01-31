const Object = require('../models/object.model');
var lostObjects;

// Add new object
function object_add(req, res) {
    let lostobject = new Object({
        name: req.body.name,
        lossAddress: req.body.lossAddress,
        contact: req.body.contact
    });

    lostobject.save(function (err) {
        if (!err)
            res.redirect('all/1')
        else
            res.send(err)
    })
};

// Find all the objects
async function getLostObjects(page) {
    var perPage = 3
    lostObjects = await Object.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage).sort({ _id: -1 })
    return lostObjects;
}

// Export getLostObjects
module.exports = {
    getLostObjects: getLostObjects,
    object_add: object_add
}