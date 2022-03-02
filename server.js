const express = require('express');

const app = express();

//Routes
app.get('/',(req,res) =>{
    res.send('home');
});

const PORT = 4000;

app.listen(PORT,()=>console.log(`Listening to port ${PORT}`));

