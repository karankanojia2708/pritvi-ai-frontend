const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 1827;
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
    //res.send('Fire ');
})

app.listen(PORT, () => {

}); 