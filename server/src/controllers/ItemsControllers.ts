import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsControllers {
    async index(request: Request, response: Response) {
        const items = await knex("items").select("*");

        const serializeditems = items.map((item) => {
            return {
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });
        return response.json(serializeditems);
    }
}

export default ItemsControllers;
