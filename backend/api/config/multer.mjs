import multer, { memoryStorage, diskStorage } from "multer";
import path from "path";
import { __dirname } from "../index.mjs";
// local storage (save to local storage)
export const DISK_STORAGE = diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "content", "images"))
    },
    filename: (req, file, callback) => {
        const fileType = file.mimetype.split("/");
        callback(null, `${ fileType[fileType.length - 1].toUpperCase() }_${Date.now()}`)
    }
});

// buffer storage (save to memory temp)
export const MEMORY_STORAGE = memoryStorage();

// basic config
const MULTER = (mimetype, storage, maxSize) => {
    return multer({
        storage: storage,
        limits: {
            fileSize: maxSize
        },
        fileFilter: (req, file, callback) => {
            if(!(mimetype.includes(file.mimetype))) {
                const error = new Error("Jenis file tidak diperbolehkan!");
                return callback(error);
            }
        
            return callback(null, file)
        },
    });
}

export function MULTER_CONFIG(
    format = "single", 
    filename = "file", 
    mimetype = "plain/txt",
    storage = MEMORY_STORAGE, 
    maxSize = (1 * 1024 * 1024)
    ) {

    if(format === "single") {
        return MULTER(
            mimetype, 
            storage,
            maxSize
        ).single(filename);
    }

    return MULTER(
        mimetype, 
        storage,
        maxSize
    ).array([...filename]);
}