let express = require('express');
let app = express();
app.use(express.json());

const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://ckw283:<pwd>@connectionslab.yhz5kee.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect(); 

let twirlTracker = [];

// app.get('/', (req, res)=>{
//     res.send('this is the main page')
// })

//add route on server that is listening for POST request
app.post('/numTwirls', (req, res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        twirl: req.body.numberTwirls,
    }
    db.push("twirlTrackerData", obj);
    // twirlTracker.push(obj);
    // console.log(twirlTracker);
    res.json({task:"success"});
})

app.use('/', express.static('public'));

app.listen(5000, ()=>{
    console.log('listening at localhost:5000');
})

//add route to get all twirls and leaps tracked info
app.get('/getTwirls', (req,res)=>{
    db.get("twirlTrackerData").then(twirlData =>{
        let obj = {data: twirlData};
        res.json(obj);
    })
    
})