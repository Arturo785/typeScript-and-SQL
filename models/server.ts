import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user';
import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;

    private apiPaths = {
        usersPath: '/api/users'
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8081';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port: ${this.port}`);
        })
    }

    routes() {
        this.app.use(this.apiPaths.usersPath, userRoutes);
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //read body
        this.app.use(express.json());

        //public folder
        this.app.use(express.static('public'));

    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online")
        }
        catch (err) {
            throw new Error(err)
        }
    }
}

export default Server; // exports our class server
// exports class server also works