const Object = require('../models/object.model');
const mongoose = require('mongoose');


//add new object
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

//find all the objects
exports.object_details = function (req, res) {
    Object.find({}).exec(function(err, result) {
    if (!err) {
	  res.send(result)

    } else {
      res.send('Error in first query. ' + err)
    };
      });
};
