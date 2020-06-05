import { celebrate, Joi } from "celebrate";
import express from "express";
import multer from "multer";
import multerConfig from "./configs/multerConfigs";
import ItemsControllers from "./controllers/ItemsControllers";
import PointsControllers from "./controllers/PointsControllers";
0;
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
route.post(
    "/points",
    upload.single("image"),
    celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                items: Joi.string().required().regex(new RegExp("[1-9]+,*")),
            }),
        },
        {
            abortEarly: false,
        }
    ),
    pointscontrollers.create
);

export default route;
