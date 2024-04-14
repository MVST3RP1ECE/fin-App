import sqlite3 from "sqlite3";


export async function fetchAllRows(dbPath, tableName){
    return new Promise((resolve, reject)=>{
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
            if (err) {
                console.log(err.message);
                reject(err);
            }
            console.log("Connected to DataBase.");
        });

            db.all(`SELECT * FROM ${tableName}`, [], (err, rows)=>{
                if(err){
                    console.error(err.message);
                    reject(err);
                }
                console.log(`Data recieved! Table: ${tableName}`); 
                resolve(rows)
                // console.log("Log on DB file -> ", rows);

            db.close((err)=>{
                if (err) {
                    console.error("DB connection error: ", err.message);
                    reject(err);
                }
                console.log("DB connection closed succesefuly!");
            })
        })
    })
}

export async function incertIntoTableIncome(dbPath, currency, amount, category_inc, date, id){
    return new Promise((resolve, reject)=>{
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
            if (err) {
                console.err(err.message);
                reject(err);
            }
            console.log("Connected to Database!");
        });

        // db.serialize(()=>{

            db.run("INSERT INTO Income (currency, amount, category_inc, date, id) VALUES (?,?,?,?,?)", [currency, amount, category_inc, date, id], (err)=>{
                if (err) {
                    console.error("xyi", err.message);
                    reject(err);              
                };
                resolve();
            });
    
            db.close((err)=>{
                if(err){
                    console.error(err.message);
                    reject(err);
                } 
                resolve();
                console.log("DB connection is closed!");
            });
        // });
    });
}

    // Пример insert запроса

    // db.run("INSERT INTO currency_list(currency_name) VALUES (?)", ["DOGE"] ,(err)=>{
    //     if (err) {
    //         console.log(err.message);
    //     }

    // })
