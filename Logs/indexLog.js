import fs from "fs";
import os from "os";

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
    -------------------------------------
    Адрес действия: ${url};
    -------------------------------------
    Платформа: ${os.platform};
    -------------------------------------
    Архитектура: ${os.arch};
    -------------------------------------
    Тип ОС: ${os.type};
    -------------------------------------
    Версия ОС: ${os.release};


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
    -------------------------------------
    Адрес действия: ${url};
    -------------------------------------
    Платформа: ${os.platform};
    -------------------------------------
    Архитектура: ${os.arch};
    -------------------------------------
    Тип ОС: ${os.type};
    -------------------------------------
    Версия ОС: ${os.release};

    ----------------------------------------------------------------------------
    Дата события: ${new Date()}
    ----------------------------------------------------------------------------
    Вводимые данные: \n\t\t ${temp}
    ----------------------------------------------------------------------------\n\n\n`, () => {return true;})
}
