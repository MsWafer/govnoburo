const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Project = require('../Project');

router.post ('/',
    check('projectName', 'Введите название проекта').not().isEmpty(), 
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    let { projectName, date } = req.body;

    if(!date){
        date = new Date().getFullYear();
    }

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

        // let myPromise = new Promise(function(myResolve, myReject) {  
          // The producing code (this may take some time)
          
        //     if (!Project.findOne({crypt})) {
        //       myResolve();
        //     } else {
        //       myReject(crypt);
        //     }
        //   });
          
        //   myPromise.then(
        // //     function(value) {},
        //     (error) => {myPromise}
        //   );


        // do{crypt}while(Project.findOne({crypt}))
        // while(Project.findOne({crypt})){crypt};

        project = new Project({
            crypt,
            projectName,
            date
        });
        
        await project.save();
        console.log(`Проект ${crypt} добавлен`)

        return res.status(200).send(`Проект ${crypt} добавлен`);

    } catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
    }
    
});

module.exports = router;