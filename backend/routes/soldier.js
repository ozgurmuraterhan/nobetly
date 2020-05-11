const router = require('express').Router();
let Soldier = require('../models/soldier.model');

const title = 'Soldier';

// get all items
router.route('/').get((req, res, next) => {
  Soldier.aggregate([
    {
      $project: {
        name: 1,
        email: 1,
        phone: 1,
        _id: 1,
        group_id: 1,
        totalPost: 1,
        defaultAddress_state_id: 1,
      },
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

// get all name of items
router.route('/name').get((req, res, next) => {
  Soldier.aggregate([
    {
      $project: {
        name: 1,
        _id: 0,
      },
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

// fetch data by now date
router.route('/gettime').post((req, res, next) => {
  if (req.body[0].nowDate == 'Monday') {
    console.log(Boolean(req.body[5].plusNightNumber));
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Monday': { label: req.body[1].time, value: Boolean(true) },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Monday': { label: req.body[1].time, value: Boolean(true) },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }

  if (req.body[0].nowDate == 'Tuesday') {
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Tuesday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Tuesday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }

  if (req.body[0].nowDate == 'Wednesday') {
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Wednesday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Wednesday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }

  if (req.body[0].nowDate == 'Thursday') {
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Thursday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Thursday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }

  if (req.body[0].nowDate == 'Friday') {
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Friday': { label: req.body[1].time, value: Boolean(true) },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Friday': { label: req.body[1].time, value: Boolean(true) },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }

  if (req.body[0].nowDate == 'Saturday') {
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Saturday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Saturday': {
                label: req.body[1].time,
                value: Boolean(true),
              },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }
  if (req.body[0].nowDate == 'Sunday') {
    if (req.body[5].plusNightNumber == true) {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Sunday': { label: req.body[1].time, value: Boolean(true) },
            },
            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: true,
          },
        },
        { sort: { totalPostNight: 1, totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    } else {
      Soldier.findOneAndUpdate(
        {
          $and: [
            {
              'times.Sunday': { label: req.body[1].time, value: Boolean(true) },
            },

            { $nor: req.body[2].norPerson },
          ],
        },

        {
          $inc: {
            totalPost: +req.body[3].plusNumber,
          },
          $set: {
            totalPostNight: false,
          },
        },
        { sort: { totalPost: 1 } }
      ).then((data) => {
        res.json(data);
      });
    }
  }
});

// update add post by id
router.route('/postnumberzero').get((req, res, next) => {
  Soldier.updateMany({}, { $set: { totalPost: 0, totalPostNight: 0 } })
    .then(() => {
      res.json({
        messagge: title + ' Update',
        variant: 'success',
      });
    })
    .catch((err) =>
      res.json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});

// update add post by id
router.route('/addposttime/:id').post((req, res, next) => {
  Soldier.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { totalPost: +1 } },
    { $push: { posts: req.body } }
  )
    .then(() => {
      res.json({
        messagge: title + ' Update',
        variant: 'success',
      });
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
  new Soldier(req.body)
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
  Soldier.aggregate([
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
  Soldier.findById(req.params.id)
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
  Soldier.findByIdAndDelete(req.params.id)
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
  Soldier.findByIdAndUpdate(req.params.id, req.body)
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
