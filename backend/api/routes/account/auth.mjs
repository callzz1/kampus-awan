import { Router } from "express";
import { User, database } from "../../config/database.mjs";
import bcrypt from "bcrypt";

const router = Router();

export const checkAuth = (req, res, next) => {
    if(!req.session.status) {
        return res.status(401).json({
            error: true,
            message: "Silahkan login untuk melanjutkan"
        });
    }

    next();
}

export const checkMitra = (req, res, next) => {
    if(!req.session.user.is_mitra) {
        return res.status(400).json({
            error: true,
            message: "Hanya mitra yang diperbolehkan untuk melanjutkan"
        });
    }

    next();
}

router.post("/api/login", async (req, res) => {
    const { username, userpassword } = req.body;

    try {
        const result = await User.findOne({
            where: {
                name: username
            }
        });

        if(!result) {
            return res.status(400).json({
                error: true,
                message: "Username atau Password salah!"
            });
        }

        // get password that match username
        const { password } = result;

        // compare using bcrypt
        const checkPassword = await bcrypt.compare(userpassword, password);

        if(!checkPassword) {
            return res.status(400).json({
                error: true,
                message: "Username atau Password salah!"
            });
        }

        const { id, name, perk, photo_profile_url, is_mitra, is_admin, is_subscribed } = result;

            const user = {
                id: id,
                name: name,
                perk: perk,
                photo_profile_url: photo_profile_url,
                is_mitra: is_mitra,
                is_admin: is_admin,
                is_subscribed: is_subscribed
            }

            // save the session into cookie after login
            req.session.status = true;
            req.session.user = user;

            return res.status(201).json({
                error: false,
                message: "Login berhasil"
            });

    } catch(err) {
        return res.status(400).json({
            error: true,
            message: "Gagal mengautentikasi akun!"
        });
    }
});

router.get("/api/session/user", (req, res) => {
    if(req.session) {
        return res.status(200).json(
            req.session.user
        )
    }
});

router.get("/api/session/status", (req, res) => {
    return res.status(201).json({
        status: req.session.status ? true : false
    });
});

router.delete("/api/session", checkAuth, async(req, res) => {
    try {
        if(req.session) {
            req.session.destroy();
        }
        
        return res.status(200).json({
            err: false,
            message: "Session berhasil dihapus!"
        });
    } catch(err) {
        return res.status(400).json({
            err: true,
            message: "Session gagal dihapus!"
        });
    }
});

export default router;
