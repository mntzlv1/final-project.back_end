const express = require("express");
const bodyParser = require("body-parser");

const app = express ();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/calculate-bmi",(req,res)=>{
    const {weight,height} = req.body;
    const weightnum = parseFloat(weight);
    const heightnum = parseFloat(height);

    if(!weightnum || weightnum<=0 || !heightnum || heightnum<=0){
        return res.send(
            `<h3>write positive number</h3>`
        );
    }

    const bmi = (weightnum / (heightnum ** 2 )).toFixed(2);
    let category = "";
    let color ="";

    if(bmi<18.5){
        category="underweight";
        color="blue";
    }else if(bmi<24.9){
        category="normal weight";
        color="green";
    }else if(bmi<29.9){
        category="overweight";
        color="yellow";
    }else{
        category="obuse";
        color="red";
    }

    res.send(
        `<h3> your BMI is ${bmi}. Category:<span style="color: ${color};">${category}</span></h3>`
    );
});


app.listen(PORT,()=>{
    console.log(`go http://localhost:${PORT}`);
});