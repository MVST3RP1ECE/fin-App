// import model from "../model/server.js";
import path from "path";


// table.innerHTML += `
//     <tbody>
//         <tr class="table-dark justify-content-center text-center ">
//             <td>${id}</td>
//             <td>${userData[0]}</td>
//             <td>${userData[1]}</td>
//             <td>${userData[2]}</td>
//             <td>${userData[3]}</td>
//             <td>${userData[4]}</td>
//         </tr>
//     </tbody>
// </table>`

export default {
    dataLog: (req,res)=>{
        console.log(123344);
        console.log(req.body);
        // const {currency, amount, source} = req.body;
        res.send(income); // Вернёт body запроса на странице, которую обрабатывает контроллер, т.е. /income
        // res.sendFile(path.resolve("./ejs/income.ejs"));
        
    },
    dataTable: (req,res)=>{

    },
}