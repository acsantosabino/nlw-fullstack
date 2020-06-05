import { Request, Response } from "express";
import knex from "../database/connection";

// index, show, create, update, delete

class PointsControllers {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        let query = knex("points")
            .join("point_items", "points.id", "=", "point_items.point_id")
            .distinct()
            .select("points.*");

        if (items) {
            const parsedItems = String(items)
                .split(",")
                .map((item) => Number(item.trim()));
            query.whereIn("point_items.point_id", parsedItems);
        }
        if (city) {
            query.where("city", String(city));
        }
        if (uf) {
            query.where("uf", String(uf));
        }
        const points = await query;

        const serializedPoints = points.map((point) => {
            return {
                ...point,
                image_url: `http://192.168.1.14:3333/uploads/points/${point.image}`,
            };
        });
        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const point = await knex("points").select("*").where("id", id).first();

        if (!point) {
            response.status(400).json({ message: "Point not found" });
        }

        const items = await knex("items")
            .join("point_items", "items.id", "=", "point_items.item_id")
            .where("point_items.point_id", id)
            .select("items.title");

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.1.14:3333/uploads/points/${point.image}`,
        };

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const trx = await knex.transaction();

        const insertedIds = await trx("points").insert(point);

        const point_id = insertedIds[0];

        const pointItems = items
            .split(",")
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });

        await trx("point_items").insert(pointItems);
        await trx.commit();

        return response.json({ id: point_id, ...point });
    }
}

export default PointsControllers;
