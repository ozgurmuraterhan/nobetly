const router = require('express').Router();
let Post = require('../models/post.model');

const title = 'Post';

// get all items
router.route('/').get((req, res, next) => {
  Post.aggregate([
    {
      $project: { name: 1, _id: 1, group_id: 1, times: 1, person: 1 },
    },
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

//post gettime
router.route('/gettime').post((req, res, next) => {
  if (req.body[0].nowDate == 'Monday') {
    Post.find({
      'times.Monday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }

  if (req.body[0].nowDate == 'Tuesday') {
    Post.find({
      'times.Tuesday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }

  if (req.body[0].nowDate == 'Wednesday') {
    Post.find({
      'times.Wednesday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }

  if (req.body[0].nowDate == 'Thursday') {
    Post.find({
      'times.Thursday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }

  if (req.body[0].nowDate == 'Friday') {
    Post.find({
      'times.Friday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }

  if (req.body[0].nowDate == 'Saturday') {
    Post.find({
      'times.Saturday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }

  if (req.body[0].nowDate == 'Sunday') {
    Post.find({
      'times.Sunday.label': req.body[1].time.label,
    }).then((data) => {
      res.json(data);
    });
  }
});

// post new items
router.route('/add').post((req, res, next) => {
  new Post(req.body)
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
router.route('/statistic').get((req, res, next) => {
  Post.aggregate([
    { $unwind: '$group_id' },
    {
      $group: {
        _id: '$group_id.label',
        count: { $sum: 1 },
      },
    },
  ]).then((data) => res.json(data));
});

// fetch data by id
router.route('/:id').get((req, res, next) => {
  Post.findById(req.params.id)
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
  Post.findByIdAndDelete(req.params.id)
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
  Post.findByIdAndUpdate(req.params.id, req.body)
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
