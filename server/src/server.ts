import cors from "cors";
import express from "express";
import path from "path";
import route from "./route";
import usersRoute from "./users-route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(usersRoute);
app.use(route);

app.use(
    "/uploads/items",
    express.static(path.resolve(__dirname, "..", "uploads", "items"))
);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
