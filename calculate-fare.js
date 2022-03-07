const express = require("express");
const router = express.Router();

const  travelFare = require('./sample-data.json')

// let employees = [
// 	{id: 1, name: 'Alex', cardType: 1},
// 	{id: 2, name: 'Tom', cardType: 2},
// 	{id: 3, name: 'Helen', cardType: 3},
// 	{id: 4, name: 'Steve', cardType: 2},
// 	{id: 5, name: 'Sachin', cardType: 3}
// ]


const calculateFare = data => {
    let fare = 0;
    data.journey.forEach(element => {
        let foundValue = travelFare.find(el => {        
            return el.day === data.day 
            && el.fromZone === element.fromZone 
            && el.toZone === element.toZone;
        })
        let useDefault = true;
        foundValue.hour.forEach(fv => {
            if(element.fromTime > fv.fromTime && element.toTime < element.toTime) {
                fare += fv.fare
                useDefault = false;
            }
        })
        if(useDefault){
            fare +=foundValue.defaulFare
        }
    })
    return fare;
};

router.post("/calculate-fare",  (req, res) => {
   
    let commutedFare = calculateFare(req.body);
    res.json({
        commutedFare
    })
});

module.exports = router;
