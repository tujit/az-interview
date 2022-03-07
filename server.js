const express = require('express');
const app = express();

app.use(express.json());
const CalculateFare = require('./calculate-fare');
app.use(CalculateFare);

app.listen(3000, () => {
    console.log('server running')
})