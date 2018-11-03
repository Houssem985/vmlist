const Backend = require('../models/backend.model');
const aws = require('../services/aws.service');

exports.add = function (req, res, next) {
    let backend = new Backend(
        {
            name: req.body.name,
            type: req.body.type,
            content: req.body.content
        }
    );

    backend.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(backend)
    })
};

exports.list = function (req, res, next) {
  Backend.find()
    .select('-content')
    .exec(function (err, backends) {
    if (err) return next(err);
    res.send(backends);
  })
};

exports.show = function (req, res, next) {
  Backend.findById({_id: req.params.backend })
    .select('+content')
    .exec(function (err, backend) {
    if (err) return next(err)
    if(backend.type=='aws') {
      aws.list(res, next, backend)
    }
    else {
      res.send('notfound');
    }

  });
};

exports.delete = function (req, res, next) {
  console.log(req.params.backend)
  Backend.deleteOne({_id: req.params.backend }, function (err) {
    if (err) return next(err);
    res.send('Backend deleted successfully')
    })
};