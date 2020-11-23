const express = require('express');
const router = express.Router();


const Project = require('../Project');

//find by city
router.get('/:auth',async (req,res) => {
    try {
        let projects = await Project.find({city: req.params.auth});
        let arr =[];
        await projects.map(project => arr.push(`${project.date}-${project.crypt}-${project.title}`))
        res.json(arr);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

    
});

module.exports = router;