const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();
app.use(cors())

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req,res) => res.send('Running in the 90s'));

app.use('/', require('./routes/addProject'));
app.use('/projects', require('./routes/find'));
app.use('/city', require('./routes/findbycity'));




const PORT = process.env.PORT || 82;

app.listen(PORT, () => console.log(`Server started on ${PORT}...`));
