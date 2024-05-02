import { Router } from "express";
import { checkAuth } from "./auth.mjs";
import { User } from "../../config/database.mjs";

const router = Router();

router.get("/api/subscribe", checkAuth, async (req, res) => {
    if(req.session.user.is_subscribed === true) {
        return res.status(401).json({
            error: true,
            message: 'Kamu sudah berlangganan membership di kampus awan!'
        });
    }

    try {
        // updating is_subscribed to true
        const result = await User.update(
            { is_subscribed: true }, 
            { where: { id: req.session.user.id }
            }
        );

        if(!result) {
            return res.status(201).json({
                error: true,
                message: "Internal error!"
            });
        }

        if(req.session) {
            req.session.destroy();
        }

        return res.status(201).json({
            error: false,
            message: "Berhasil berlangganan membership kampus awan!"
        });
    } catch(err) {
        return res.status(201).json({
            error: false,
            message: "Gagal berlangganan membership Kampus Awan!" 
        });
    }
});

export default router;