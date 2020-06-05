import axios from "axios";

export interface Item {
    id: number;
    title: string;
    image_url: string;
}

export interface Point {
    id: number;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    uf: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface Data {
    point: Point;
    items: {
        title: string;
    }[];
}

export interface Query {
    uf: string;
    city: string;
    items: number[];
}

const api = axios.create({
    baseURL: "http://192.168.1.14:3333/",
});

export default () => {
    const findPoint = (id: number) => api.get<Data>(`/points/${id}`);
    const findAllPoints = () => api.get<Point[]>("/points");
    const findPoints = (query: Query) =>
        api.get<Point[]>("/points", {
            params: query,
        });
    const findAllItems = () => api.get<Item[]>("/items");

    return {
        findPoint,
        findAllItems,
        findAllPoints,
        findPoints,
    };
};
