import express from 'express';
import "reflect-metadata";
import AppDataSource from "./config/database/data-source";
import { routes } from './routes';

AppDataSource.initialize().then(async () => {
    console.log(`Data Source has been initialized`);
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    const app = express();

    app.use(express.json());

    app.use(routes);

    app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}...`));

}).catch(error => console.log("Data Source initialization error", error))