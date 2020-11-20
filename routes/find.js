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
//find by crypt/title
router.get('/:auth', async(req,res) => {
    try {
        let project = await Project.findOne({crypt: req.params.auth});
        let projectTitle = await Project.find({title: req.params.auth}).select('-_id -__v');

        if(!project && !projectTitle) {
            return res.status(400).json({msg: "Проект не найден"})
        } else if (project) {
            res.json({
                title:`Имя проекта:${project.title}`,
                crypt: `Шифр проекта:${project.crypt}`,
                date: `Дата:${project.date}`,
                city: `Город:${project.city}`    
            });
        } else if (projectTitle) {
            res.json(projectTitle);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});
//delete
router.delete('/:crypt',async(req,res) => {
    try {
        const project = await Project.findOne({crypt: req.params.crypt});
        if(!project) {
            return res.status(404).json('Проект не найден')
        };
        await project.remove();
        res.json({msg:`Проект удален`});
    }catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    };
});

//edit
router.put("/:crypt", async (req, res) => {

    const newTitle = req.body.title;
    const newDate = req.body.date;
    try {
        const project = await Project.findOneAndUpdate({crypt: req.params.crypt}, {$set: {title:newTitle, date:newDate}})
        res.json({
            title:`Имя проекта:${project.title}`,
            crypt: `Шифр проекта:${project.crypt}`,
            date: `Дата:${project.date}`});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

module.exports = router;