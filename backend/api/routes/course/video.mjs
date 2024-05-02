import { database, Video, Course } from "../../config/database.mjs";
import express, { Router } from "express";
import { MULTER_CONFIG } from "../../config/multer.mjs";
import { uploadFile } from "../../utils/file.mjs";

const router = Router();

router.get("/api/videos", async (req, res) => {
    const { id, courseid } = req.query;

    const query = {};

    if(id) query.where = { id: id }
    if(courseid) query.where = { course_id: courseid }
    
    try {
        let result = await Video.findAll(query);

        if(id) {
            result = await Video.findOne(query);
        }

        if(!result) {
            return res.status(401).json({
                error: true,
                message: "Internal error!"
            });
        }

        return res.status(201).json(result);
    } catch(err) {
        return res.status(400).json({
            error: true,
            message: "Gagal mendapatkan video!"
        });
    }
});

router.post("/api/videos", MULTER_CONFIG("single", "file", ["video/mp4"]), async (req, res) => {
    const { title, course_id } = req.body;
    
    const file = req.file;

    // check if file exist
    if(!file) {
        return res.status(400).json({
          error: true,
          message: "Form file harus diisi"
        });
    }

    const video = {
        title: title,
        url: await uploadFile(file),
        course_id: course_id
    }

    try {
        const result = await Video.create({
            title: video.title,
            url: video.url,
            course_id: video.course_id
        });


        if(!result) {
            return res.status(401).json({
                error: true,
                message: "Internal error!"
            });
        }

        return res.status(201).json({
            error: false,
            message: "Video pelajaran berhasil dibuat!"
        });
    } catch(Error) {
        return res.status(400).json({
            error: true,
            message: "Video pelajaran gagal dibuat!"
        });
    }
});

export default router