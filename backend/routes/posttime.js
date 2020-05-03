const router = require('express').Router();
let PostTime = require('../models/posttime.model');

const title = 'Post Time';

// get all items
router.route('/').get((req, res, next) => {
  PostTime.aggregate([
    {
      $project: { name: 1, _id: 1, date: 1 },
    },

    { $sort: { date: -1 } },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// post new items
router.route('/add').post((req, res, next) => {
  new PostTime(req.body)
    .save()

    .then(() =>
      res.json({
        messagge: title + ' Added',
        variant: 'success',
      })
    )
    .catch((err) =>
      res.json({
        messagge: ' Error: ' + err,
        variant: 'error',
      })
    );
});

//group name statistic
router.route('/statistic').post((req, res, next) => {
  PostTime.aggregate([
    { $unwind: '$posts' },
    {
      $group: {
        _id: '$posts.person',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]).then((data) => res.json(data));
});

// fetch data by id
router.route('/:id').get((req, res, next) => {
  PostTime.findById(req.params.id)
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
  PostTime.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.json({
        messagge: title + ' Deleted',
        variant: 'info',
      })
    )
    .catch((err) =>
      res.json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// update data by id
router.route('/:id').post((req, res, next) => {
  PostTime.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>
      res.json({
        messagge: title + ' Update',
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

module.exports = router;
