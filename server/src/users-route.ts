import express from "express";

const route = express.Router();

const users = ["Diego", "Cleiton", "Robson", "Daniel"];

route.get("/users", (request, response) => {
    console.log("Listagem de usuários");
    const search = String(request.query.search);

    const filteredusers = search
        ? users.filter((user) => user.includes(search))
        : users;

    // response.send("Hello World");
    response.json(filteredusers);
});

route.get("/users/:id", (request, response) => {
    const id = Number(request.params.id);
    response.json(users[id]);
});

route.post("/users", (request, response) => {
    const data = request.body;
    console.log(data);

    const user = {
        name: data.name,
        email: data.email,
    };
    response.json(user);
});

export default route;
