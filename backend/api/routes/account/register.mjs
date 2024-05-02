import { Router } from "express";
import { User } from "../../config/database.mjs";
import bcrypt from "bcrypt";
import { MULTER_CONFIG } from "../../config/multer.mjs";
import { uploadFile } from "../../utils/file.mjs";

const router = Router();

router.post("/api/register", MULTER_CONFIG("single", "file", ["image/png", "image/jpg", "image/jpeg", "image/webp"]), async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    const file = req.file;

    let photoProfileUrl = "";
    
    if(file) {
        photoProfileUrl = await uploadFile(file);
    }

    // check apakah semua data ada
    if(!(username && email && password && confirm_password)) {
        return res.status(401).json({
            error: true,
            message: "Semua kolom harus diisi!"
        });
    }

    // check apakah password sama
    if(!(password === confirm_password)) {
        return res.status(401).json({
            error: true,
            message: "Password berbeda!"
        });
    }

    // check apakah username memiliki kata non-word menggunakan regex
    if(username.match(/\W/)) {
        return res.status(401).json({
            error: true,
            message: "Username tidak diperbolehkan!"
        });   
    }

    // format email
    const isEmail = "@.".split("").every(value => email.includes(value));

    // check apakah email input memiliki value @ dan . 
    if(!isEmail) {
        return res.status(401).json({
            error: true,
            message: "Email tidak valid!"
        });  
    }

    try {
        // check ketersediaan nama
        const checkName = await User.findAll({
            where: {
                name: username
            }
        });

        if(checkName.length > 0) {
            return res.status(400).json({
                error: true,
                message: "Username telah ada!"
            });
        }

        // hash password dari user
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = User.create({
            name: username,
            email: email,
            password: hashedPassword,
            photo_profile_url: photoProfileUrl
        });

        if(!result) {
            return res.status(400).json({
                error: true,
                message: "Internal error!"
            });
        }

        return res.status(400).json({
            error: false,
            message: "Berhasil membuat akun!"
        });

    } catch(err) {
        return res.status(400).json({
            error: true,
            message: err.message
        });
    } 
})

export default router;
