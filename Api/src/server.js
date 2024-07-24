import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import userRoute from "./route/userRoute";
import productRoute from "./route/productRoute";
import cartRoute from "./route/cartRoute";
import orderRoute from "./route/orderRoute";
import orderDetailRoute from "./route/orderDetailRoute";
import connectDB from "./config/connectDB";
import cors from 'cors';

require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

//Route
userRoute(app);
productRoute(app);
cartRoute(app);
orderRoute(app);
orderDetailRoute(app);


connectDB();

let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Backend is running on the port : " + port);
});