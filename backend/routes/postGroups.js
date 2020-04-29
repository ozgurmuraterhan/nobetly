const router = require("express").Router();
let PostGroups = require('../models/postgroups.model')
let Post = require('../models/post.model')

const title = "Post Group"

// get all items
router.route('/').get((req,res,next)=>{
    
    PostGroups.find()
    .then(data => res.json(data))
    .catch(err=> res.json(
        { 
            messagge:'Error: ' + err,
            variant:'error'
            
        }
        ))
})


// post new items
router.route('/add').post((req,res,next)=>{

    new PostGroups(req.body).save()
        .then(()=>res.json(
            { 
                messagge:title + ' Added',
                variant:'success'
                
            }
            ))
        .catch(err=> res.json(
            { 
                messagge:'Error: ' + err,
                variant:'error'
                
            }
            ))
})

// fetch data by id
router.route('/:id').get((req,res,next)=>{
    
    PostGroups.findById(req.params.id)
        .then(data=> res.json(data))
        .catch(err=> res.status(400).json(
            { 
                messagge:'Error: ' + err,
                variant:'error'
                
            }
        ));
})

// delete data by id
router.route('/:id').delete((req,res)=>{

    Post.updateMany(  
        { },
        { $pull: { group_id: {value: req.params.id }} },
        { multi: true }
 
    ).catch((err)=>console.log(err))
     PostGroups.findByIdAndDelete(req.params.id)
         .then(data=> res.json(
             { 
                 messagge:title+' Deleted',
                 variant:'info'
             }
             ))
         .catch(err=> res.status(400).json(
             { 
                 messagge:'Error: ' + err,
                 variant:'error'
                
             }
         ))
})

// update data by id
router.route('/:id').post((req,res,next)=>{

    //Posts collection group_id update by id
    Post.updateMany(    
        { "group_id.value" : req.params.id },
        { $set: { "group_id.$.label" : req.body.name  }  },
 
    )
    .catch(err=>console.log(err))

    //PostsGroup update
     PostGroups.findByIdAndUpdate(req.params.id, req.body)
         .then(()=> res.json(
             { 
                 messagge:title+' Updated',
                 variant:'success'
                
             } 
         ))
         .catch(err=> res.status(400).json(
             { 
                 messagge:'Error: ' + err,
                 variant:'error'
                
             }
         ));
 
})



module.exports = router