import express from "express";
import path from "path";
import controller from "../controller/index.js";
import {fetchAllRows, incertIntoTableIncome, incertIntoTableOutcome, insertIntoTableInvest} from "../model/dbModel.js"
import { createErrorLog, createEventLog } from "../Logs/indexLog.js";
const app = express();
const PORT = process.env.PORT ?? 3000;
let incomeObjArray = [];
let outcomeObjArray = [];
let investObjArray = [];

// устанавливаем шаблонизатор ejs (terminal: npm i ejs). При ejs, метод send(sendFile) менятся на render
app.set("view engine", "ejs");


// middleware
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({extended: false}));



// куча роутов
// app.get("/", (req,res)=>{
//     res.sendFile(path.resolve("./public/index.html"))
// })

app.get("/", (req,res)=>{
    const title = "Main";
    res.render("../ejs/index", {title})
})

app.get("/index.ejs", (req,res)=>{
    const title = "Home";
    res.render("../ejs/index", {title})
})

app.get("/income.ejs", (req,res)=>{
    const title = "Income";
    res.render("../ejs/income", {title});
})

app.get("/outcome.ejs", (req,res)=>{
    const title = "Outcome";
    res.render("../ejs/outcome", {title});
})


// app.post("/income", controller.dataLog)
app.post("/income", async (req,res)=>{
    const title = "Income";
    const income = {
        id: new Date(),
        currency: req.body.incomeCurrency.toUpperCase(),
        amount: req.body.incomeValue,
        source: req.body.incomeType.toUpperCase(),
        date: new Date().toLocaleDateString(),
    };
    incomeObjArray.push(income);
    console.log(title, income, incomeObjArray);
    res.render("../ejs/income", {title, income, incomeObjArray})
    
    const insertIncomeArr = await (async ()=>{
        try {
            await incertIntoTableIncome(path.resolve("./model/FinAppDB.db"), income.currency, income.amount, income.source, income.date, income.id)
        } catch (error) {
            console.log(error);
            createErrorLog("http://localhost:3000/income", income)
        }
    })();
    createEventLog("http://localhost:3000/income", income);
})

app.post("/outcome", async (req,res)=>{
    const title = "Outcome";
    const outcome = {
        id: new Date(),
        currency: req.body.incomeCurrency.toUpperCase(),
        amount: req.body.incomeValue.toUpperCase(),
        source: req.body.outcomeCategory.toUpperCase(),
        date: new Date().toLocaleTimeString()
    };
    outcomeObjArray.push(outcome);
    res.render("../ejs/outcome", {title, outcome, outcomeObjArray})
    const insertOutcomeArr = await (async ()=>{
        try {
            await incertIntoTableOutcome(path.resolve("./model/FinAppDB.db"), outcome.currency, outcome.amount, outcome.source, outcome.date, outcome.id)
        } catch (error) {
            console.log(error);
            createEventLog("http://localhost:3000/outcome", outcome);
        }
    })();
    createEventLog("http://localhost:3000/outcome", outcome);
})

app.post("/invest", async (req,res)=>{
    const title = "Invest";
    const invest = {
        id: new Date(),
        currency: req.body.incomeCurrency.toUpperCase(),
        amount: req.body.incomeValue.toUpperCase(),
        source: req.body.investType.toUpperCase(),
        date: new Date().toLocaleTimeString()
    };
    console.log(req.body);
    investObjArray.push(invest);
    res.render("../ejs/invest", {title, invest, investObjArray});
    const insertInvestArr = await (async ()=>{
        try {
            await insertIntoTableInvest(path.resolve("./model/FinappDB.db"), invest.currency, invest.amount, invest.source, invest.date, invest.id)
        } catch (error) {
            console.log(error);
            createEventLog("http://localhost:3000/invest", invest);
        }
    })();
    createEventLog("http://localhost:3000/invest", invest);
})

app.get("/outcome.ejs", (req,res)=>{
    // res.sendFile(path.resolve("./public/outcome.html"))
    const title = "Outcome";
    res.render("../ejs/outcome", {title});
})

app.get("/invest.ejs", (req,res)=>{
    // res.sendFile(path.resolve("./public/invest.html"))
    const title = "Invest";
    res.render("../ejs/invest", {title});
})

app.get("/log.ejs", (req,res)=>{
    // res.sendFile(path.resolve("./public/log.html"))
    const title = "Log";
    res.render("../ejs/log", {title});
})

app.listen(PORT, async ()=>{
    console.log(`Server has been started on PORT ${PORT}.`);
    let arrDBInc = [];
    let arrDBOut = [];
    let arrDBInv = [];

    const arrInc = await (async () => {
        try {
            const rows = await fetchAllRows(path.resolve("./model/FinAppDB.db"), "Income");
            console.log("Log on server Income ->", rows);
            arrDBInc.push(rows);
            return rows;
        } catch (err) {
            console.error(err.message);
        }
    })();

    const arrOut = await (async () => {
        try {
            const rows = await fetchAllRows(path.resolve("./model/FinAppDB.db"), "Outcome");
            console.log("Log on server Outcome ->", rows);
            arrDBOut.push(rows);
            return rows;
        } catch (err) {
            console.error(err.message);
        }
    })();

    const arrInv = await (async ()=> {
        try {
            const rows = await fetchAllRows(path.resolve("./model/FinAppDb.db"), "Invest");
            console.log("Log on server Invest ->", rows);
            arrDBInv.push(rows);
            return rows;
        } catch (err) {
            console.error(err.message);
        }
    } )
})