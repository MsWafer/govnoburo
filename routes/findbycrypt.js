const express = require('express');
const router = express.Router();


const Project = require('../Project');

//find all
router.get('/',async (req,res) => {
    try {
        const projects = await Project.find().select('-_id -__v');
        res.json(projects);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

    
});
//find by crypt
router.post('/', async(req,res) => {
    try {
        const project = await Project.findOne({crypt: req.body.crypt});
        
        if(!project) return res.status(400).json({msg: "Проект не найден"});
        res.json(`${project.date}-${project.crypt}-${project.projectName}`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});

//delete
router.delete('/',async(req,res) => {
    try {
        await Project.findOneAndRemove({crypt: req.body.crypt});
        res.json({msg:`Проект ${crypt} удален`});
    }catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    };
});


module.exports = router;