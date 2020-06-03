import express from "express";
import ItemsControllers from "./controllers/ItemsControllers";
import PointsControllers from "./controllers/PointsControllers";

const route = express.Router();

const itemscontrollers = new ItemsControllers();
const pointscontrollers = new PointsControllers();

route.get("/", (request, response) => {
    response.json({ message: "Hello World" });
});

route.get("/items", itemscontrollers.index);

route.get("/points", pointscontrollers.index);
route.get("/points/:id", pointscontrollers.show);
route.post("/points", pointscontrollers.create);

export default route;
