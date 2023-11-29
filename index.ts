import express,{Express} from "express";
import dotenv from "dotenv";
import * as database from "./config/database"
import mainV1Routes from "./api/v1/routes/index.route";
import bodyParser from"body-parser";
import cors from "cors"
dotenv.config();
database.connect();
const app:Express = express();
const port:string | number = process.env.PORT || 3000;

// var corsOptions = {
//   origin: "http://example.com",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(cors());
 
// parse application/json
app.use(bodyParser.json())

// Routes Ver 1
mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
