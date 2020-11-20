const express = require('express');
const router = express.Router();


const Project = require('../Project');

//find by city
router.get('/:auth',async (req,res) => {
    try {
        const projects = await Project.find({city: req.params.auth}).select('-_id -__v');
        if(!projects){
            res.json('В данном городе нет проектов')
        }
        res.json(projects);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

    
});

module.exports = router;