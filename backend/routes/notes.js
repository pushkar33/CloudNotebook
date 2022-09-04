const express=require('express');
const router=express.Router();

// importing middleware fetchuser
const fetchuser=require('../middleware/fetchuser');

// Importing Notes Model
const Notes=require('../models/Notes');

// importing express-validator
const { body, validationResult } = require('express-validator');


// Route1 : Get All the notes using Get "/api/auth/getuser". Login Required.

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    
    try{
     
        const notes=await Notes.find({user:req.user.id});
        res.json(notes);

    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Some Error Occurred");
    }
    
})

// Route2 : Add a new note using POST "/api/auth/addnote". Login Required.

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3 }),
    body('description','description must be min 5 characters long').isLength({ min: 5 }),
],async(req,res)=>{

    try{
        const {title,description,tag}=req.body;

        // Check for errors and send bad request with errors..
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note=new Notes({
    
         title,description,tag,user:req.user.id
    
        })
    
        const savedNote=await note.save();
        res.json(savedNote);
    }catch(err){
        console.error(err.message)
        res.status(500).send("Some Error Occurred");
    }

    

})

// Route 3 : Update an existing note using Put : "/api/auth/updatenote"

router.put('/updatenote/:id',fetchuser,[

    

],async(req,res)=>{

    const {title,description,tag}=req.body;
    try{

        const newNote={};

    if(title)
    {
        newNote.title=title;
    }

    if(description){newNote.description=description};

    if(tag){newNote.tag=tag};

    // Find the note to be updated and update it

    let note=await Notes.findById(req.params.id);

    if(!note){
        return res.status(404).send("Not Found");
    }

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});

    }catch(err){

        console.error(err.message)
        res.status(500).send("Some Error Occurred");

    }

    

})


// Route 4 : Delete an existing note using Delete : "/api/auth/deletenote"

router.delete('/deletenote/:id',fetchuser,[

    

],async(req,res)=>{

     try{

        // Find the note to be deleted and delete it

    let note=await Notes.findById(req.params.id);

    if(!note){
        return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this note

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been Deleted",note:note});


     }catch(err){

        console.error(err.message)
        res.status(500).send("Some Error Occurred");

     }
    
})



module.exports=router;