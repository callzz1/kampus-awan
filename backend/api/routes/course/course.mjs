import { Router } from "express";
import { database, User, Course } from "../../config/database.mjs";
import { MULTER_CONFIG } from "../../config/multer.mjs"
import { uploadFile } from "../../utils/file.mjs";
import { Op } from "sequelize";

// router setup
const router = Router();

function checkAuth(req, res, next) {
    if(!req.session.status) {
        return res.status(401).json({
            error: true,
            message: "Silahkan login untuk melanjutkan"
        });
    }

    next();
}

function checkMitra(req, res, next) {
    if(!req.session.user.is_mitra) {
        return res.status(400).json({
            error: true,
            message: "Hanya mitra yang diperbolehkan untuk melanjutkan"
        });
    }

    next();
}

// routes
// query :
// id, name, order, sort, limit
router.get("/api/courses", async (req, res) => {
    const { 
        id, 
        name,
        mitra,
        order, 
        sort,
        limit
    } = req.query;

    try {
        const query = {
            include: [{
                model: User,
                attributes: ["name", "photo_profile_url"]
            }],
            order: [["id", "DESC"]], 
        };

        // optional query
        // custom id
        if(id) {
            query.where = { 
                ...query.where, 
                id: id
            };
        }
        // custom name
        if(name) {
            query.where = { 
                ...query.where, 
                name: { [Op.like]: `%${ name }%` } 
            }
        }
        if(mitra) {
            query.where = {
                ...query.where, 
                user_id: mitra
            }
        }
        // custom order
        if(order) {
            query.order = [
                [order, sort],
            ]
        }
        // random order
        if(sort === "random") {
            query.order = database.random();
        }
        // custom limit 
        if(limit) {
            query.limit = parseInt(limit); 
        }

        // result
        let result;

        if(id) {
            result = await Course.findOne(query);
        } else {
            result = await Course.findAll(query);
        }

        return res.status(200).json(result);
    } catch(err) {
        return res.status(400).json(err);
    }
});

router.post("/api/courses", checkAuth, checkMitra, MULTER_CONFIG("single", "file", ["image/png", "image/jpg", "image/jpeg", "image/webp"]), async (req, res) => {
    const { course_name, course_description, user_id } = req.body;

    const file = req.file;

    // check if file exist
    if(!file) {
        return res.status(400).json({
          error: true,
          message: "Form file harus diisi"
        });
    }

    try {
        const course = {
            name: course_name,
            description: course_description,
            image_url: await uploadFile(file),
            user_id: user_id
        };

        if(!course) {
            return res.status(401).json({
                error: true,
                message: "Semua kolom harus diisi!"
            });
        };

        const result = await Course.create({
            name: course.name,
            description: course.description,
            image_url: course.image_url,
            user_id: course.user_id
        });

        if(!result) {
            return res.status(401).json({
                error: true,
                message: "Internal error!"
            });
        }

        return res.status(201).json({
            error: false,
            message: "Pelajaran berhasil dibuat!"
        });
    } catch(err) {
        return res.status(401).json({
            error: true,
            message: err.message
        });
    }
});

router.delete("/api/courses/", async (req, res) => {
    const { id } = req.query;

    try {
        const result = await Course.destroy({
            where: id
        });

        if(!result) {
            return res.status(401).json({
                error: true,
                message: "Internal error!"
            });
        }

        return res.status(200).json({
            error: false,
            message: "Pelajaran berhasil dihapus!"
        });
    } catch(err) {
        return res.status(401).json({
            error: true,
            message: "Pelajaran gagal dihapus!"
        });
    }
});

export default router;