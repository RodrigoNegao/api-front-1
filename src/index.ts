import express, { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// app.use('/',express.static(__dirname + '/public'));
// //Rotas - Router 
// app.get("/", (request: Request, response: Response) => {
//   return response.send("Pagina Principal");
// });

app.listen(process.env.PORT || 3000);
