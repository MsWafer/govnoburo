const express = require('express');
const router = express.Router();


const Project = require('../Project');

//find all
router.get('/',async (req,res) => {
    try {
        let arr =[];
        let projects = await Project.find();
        await projects.map(project => arr.push(`${project.date}-${project.crypt}-${project.title}`))
        if(arr.length==0){
            res.json({msg:'Не найдено проектов'})
        }else{
        res.json(arr);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

    
});
//find by crypt/title
router.get('/:auth', async(req,res) => {
    try {
        let project = await Project.findOne({crypt: req.params.auth});
        let projectTitle = await Project.find({title: req.params.auth});

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
            let arr2 =[];
            projectTitle.map(project => arr2.push(`${project.date}-${project.crypt}-${project.title}`))
            if(arr2.length==0){
                res.json({msg:'Указанный проект не найден'})
            }else{
            res.json(arr2);
            }
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
    const newCity = req.body.city;
    try {
        const project = await Project.findOneAndUpdate({crypt: req.params.crypt}, {$set: {title:newTitle, date:newDate, city:newCity}})
        res.json({
                title:`Имя проекта:${project.title}`,
                crypt: `Шифр проекта:${project.crypt}`,
                date: `Дата:${project.date}`,
                city: `Город:${project.city}`
            });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

module.exports = router;