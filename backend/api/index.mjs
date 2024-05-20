import express, { json } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import course from "./routes/course/course.mjs";
import video from "./routes/course/video.mjs"
import user from "./routes/account/user.mjs"
import register from "./routes/account/register.mjs"
import login from "./routes/account/auth.mjs"
import multer from "multer";
import ai from "./routes/AI/ai.mjs";
import sequalizeStore from "connect-session-sequelize";
import { database } from "./config/database.mjs";

// load .env file
dotenv.config();

const server = express();

const SequelizeStore = sequalizeStore(session.Store);

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SESSION_SECRET = process.env.SESSION_SECRET;

export const __dirname = import.meta.dirname;

// middleware
server.use(cors({
    origin: [
        "http://localhost:5000",
        "https://kampusawan.windupratama.me"
    ],
    methods: "GET, POST, PUT, DELETE",
    optionsSuccessStatus: 200
}));
server.use(json());
server.use(cookieParser());
server.use(session({
    name: "kampusawan_session",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 60 * 60 * 6, // 6 hours 
    },
    store: new SequelizeStore({
        db: database
    })
}));
server.use(course);
server.use(video);
server.use(user);
server.use(register);
server.use(login);
server.use(ai);

server.use((err, req, res, next) => {
    console.log(err)
    if (err instanceof multer.MulterError || Error) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

server.get("/api/", async (req, res) => {
    res.json({
        message: "API is ONLINE!"
    });
});

server.listen(
    SERVER_PORT,
    (error) => {
        if(error) {
            console.warn(`[SERVER] \t Failed to start the server!`);
        }
        console.log(`[SERVER] \t Sucessfully started the server on port ${ SERVER_PORT }`);
    }
);

export default server;