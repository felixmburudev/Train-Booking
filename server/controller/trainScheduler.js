const cron = require("node-cron");
cron.schedule('* * * * *', () => {
    const trainCity1 ={
        name: '',
        departureDate: "",
        fromCity: "city1",
        toCity: "city2",
    };

    const trainCity2 ={
        name: '',
        departureDate: "",
        fromCity: "city2",
        toCity: "city1",
    };


    const date = new Date();
    date.setDate(date.getDate() +7);
    const trainDate =date.toISOString().split('T') [0];
    trainCity1.name = `${trainDate}-${trainCity1.toCity}-Express`;
    trainCity2.name = `${trainDate}-${trainCity2.toCity}-Express`;
    trainCity1.departureDate = trainDate;
    trainCity2.departureDate =  trainDate;
    const slqInsert = `INSERT INTO trainstable (name, fromCity, toCity, departureDate) VALUE ?`;
    const values =[
        [trainCity1.name, trainCity1.fromCity , trainCity1.toCity , trainCity1.departureDate,],
        [trainCity2.name, trainCity2.fromCity , trainCity2.toCity , trainCity2.departureDate,]
    ]
    db.query((slqInsert), [values], (errorInsert, results) =>{
        if(errorInsert){
            console.log("error insertinf train " + errorInsert);
        }
        else{
            console.log("Trains Inserted ");
        }
    })
});
