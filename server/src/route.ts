import express from "express";
import multer from "multer";
import multerConfig from "./configs/multerConfigs";
import ItemsControllers from "./controllers/ItemsControllers";
import PointsControllers from "./controllers/PointsControllers";

const route = express.Router();
const upload = multer(multerConfig);

const itemscontrollers = new ItemsControllers();
const pointscontrollers = new PointsControllers();

route.get("/", (request, response) => {
    response.json({ message: "Hello World" });
});

route.get("/items", itemscontrollers.index);

route.get("/points", pointscontrollers.index);
route.get("/points/:id", pointscontrollers.show);
route.post("/points", upload.single("image"), pointscontrollers.create);

export default route;
