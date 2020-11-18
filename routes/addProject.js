const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Project = require('../Project');

router.post ('/', [
    check('projectName', 'Введите название проекта').not().isEmpty(),
    check('date', 'Введите дату').isDate(),
], 
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    const { projectName, date } = req.body;

    try{
        let project = await Project.findOne({projectName});
        if(project) {
            return res.status(400).json({ errors: [{msg: 'Проект уже был добавлен'}]});
        };

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        let crypt = getRndInteger(1000,9999)

        let gonvocod = await Project.findOne({crypt});
        if(gonvocod) {
            crypt
        };
        if(gonvocod) {
            crypt
        };
        if(gonvocod) {
            crypt
        };
        if(gonvocod) {
            crypt
        };

        project = new Project({
            crypt,
            projectName,
            date
        });
        
        await project.save();

        return res.status(200).send(`Проект ${crypt} добавлен`);

    } catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
    }
    
});

module.exports = router;