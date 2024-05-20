import fs from "fs";

export function createEventLog(url, data){
    let status = "Info";
    let temp = [];
    let objectData = Object.entries(data);
    function usersData (){
        objectData.forEach(element => {
            temp.push(element.toString().replace(",", "="));
        });
    };
    usersData();
    fs.appendFile("./Logs/eventLog.txt", `
    Статус лога: ${status};
    ----------------------------------------------------------------------------
    Дата события: ${new Date()}
    ----------------------------------------------------------------------------
    Вводимые данные: \n\t\t ${temp}
    ----------------------------------------------------------------------------\n\n\n`, () => {return true;})
}

export function createErrorLog(url, data){
    let status = "Error";
    let temp = [];
    let objectData = Object.entries(data);
    function usersData (){
        objectData.forEach(element => {
            temp.push(element.toString().replace(",", "="));
        });
    };
    usersData();
    fs.appendFile("./Logs/errorLog.txt",`
    Статус лога: ${status};
    ----------------------------------------------------------------------------
    Дата события: ${new Date()}
    ----------------------------------------------------------------------------
    Вводимые данные: \n\t\t ${temp}
    ----------------------------------------------------------------------------\n\n\n`, () => {return true;})
}
