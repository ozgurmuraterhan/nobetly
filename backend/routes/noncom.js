const router = require('express').Router();
let Noncom = require('../models/noncom.model');

const title = 'Çavuş';

// get all items
router.route('/').get((req, res, next) => {
  Noncom.find()
    .then((data) => res.json(data))
    .catch((err) =>
      res.json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// post new items
router.route('/add').post((req, res, next) => {
  new Noncom(req.body)
    .save()
    .then(() =>
      res.json({
        messagge: title + ' Added',
        variant: 'success',
      })
    )
    .catch((err) =>
      res.json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// fetch data by id
router.route('/:id').get((req, res, next) => {
  Noncom.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// delete data by id
router.route('/:id').delete((req, res) => {
  Noncom.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.json({
        messagge: title + ' Deleted',
        variant: 'info',
      })
    )
    .catch((err) =>
      res.status(400).json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// update data by id
router.route('/:id').post((req, res, next) => {
  //Posts collection group_id update by id

  //PostsGroup update
  Noncom.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>
      res.json({
        messagge: title + ' Updated',
        variant: 'success',
      })
    )
    .catch((err) =>
      res.status(400).json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

module.exports = router;
