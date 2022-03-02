const express = require('express');

const app = express();

//Routes
app.get('/',(req,res) =>{
    res.send('home');
});

app.listen(4000);

