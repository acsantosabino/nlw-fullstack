import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsControllers {
    async index(request: Request, response: Response) {
        const items = await knex("items").select("*");

        const serializeditems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.1.14:3333/uploads/items/${item.image}`,
            };
        });
        return response.json(serializeditems);
    }
}

export default ItemsControllers;
