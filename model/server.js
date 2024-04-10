import express from "express";
import path from "path";
import controller from "../controller/index.js";
const app = express();
const PORT = process.env.PORT ?? 3000;
let incomeObjArray = [];
// const ejsPage = path.resolve("../ejs");
// const createPath = (page) => path.resolve("./ejs", `${page}.ejs`);

// устанавливаем шаблонизатор ejs (terminal: npm i ejs). При ejs, метод send(sendFile) менятся на render
app.set("view engine", "ejs");
// app.set("ejs", path.resolve("./ejs"));


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
    // res.sendFile(path.resolve("./public/income.html"))
    const title = "Income";
    res.render("../ejs/income", {title});
})

// app.post("/income", controller.dataLog)
app.post("/income", (req,res)=>{
    // res.send(req.body);
    const title = "Income";
    // const {currency, amount, source} = req.body;
    // console.log("request body: " , req.body.incomeType);
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

app.listen(PORT, ()=>{
    console.log(`Server has been started on PORT ${PORT}.`);
})