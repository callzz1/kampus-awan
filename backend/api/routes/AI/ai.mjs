import { Router } from "express";
import dotenv from "dotenv";

dotenv.configDotenv();

const router = Router();

router.post("/api/ai", async (req, res) => {
    const { chat } = req.query;

    if(chat === null | chat === "") {
        return res.status(200).json({
            error: true,
            message: `Pesan harus memiliki isi!`
        });
    }

    try {
        return res.status(201).json({
            error: false,
            message: `${ chat } dari server!`
        });
    } catch(err) {
        return res.status(400).json({
            error: false,
            message: "Gagal mendapatkan response dari server!"
        });
    }
});

export default router;