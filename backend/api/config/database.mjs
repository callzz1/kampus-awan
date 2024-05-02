import dotenv from "dotenv";
import { DataTypes, Sequelize } from "sequelize";
import { __dirname } from "../index.mjs";
import mysql2 from "mysql2"
dotenv.config();

export const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    dialectModule: mysql2,
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = database.define("users", 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        perk: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "The Sparkle"
        },
        is_subscribed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_mitra: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        photo_profile_url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        initialAutoIncrement: 1000001
    }
);

const Course = database.define("courses", 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        }
    },
    {
        initialAutoIncrement: 1000001
    }
);

const Video = database.define("videos", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: Course,
                key: "id"
            }
        }
    }, {
        initialAutoIncrement: 1000001
    }
);

// FK course to user
Course.belongsTo(User, { foreignKey: 'user_id' });

database.sync();

export { User, Course, Video };