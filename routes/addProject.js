const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Project = require('../Project');

router.post ('/',
    check('title', 'Введите название проекта').not().isEmpty(),
    check('city', 'Введите город').not().isEmpty(), 
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    let { title, date, city } = req.body;

    if(!date){
        date = new Date().getFullYear();
    }

    try{
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
            title,
            date,
            city
        });
        
        await project.save();
        console.log(`Проект ${crypt} добавлен`)

        return res.status(200).send(`${date}-${crypt}-${title}`);

    } catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
    }
    
});

module.exports = router;