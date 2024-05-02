import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.GITHUB_USERNAME;
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const AUTH = process.env.GITHUB_TOKEN;

async function postFile(file) {
  try {
    // Split file type into 2 (General File Type and File Extension)
    const mimeType = file.mimetype.split("/");
    const fileType = mimeType[0].toUpperCase();

    // Assets (file) saved location
    const assetsPath = `assets/${ fileType }/${file.modifiedname}`;
    // Github repo
    const repositoryPath = `https://api.github.com/repos/${USERNAME}/${REPOSITORY}/contents/${assetsPath}`;
    
    // first fetch to get sha
    const firstRequest = await fetch(repositoryPath);
    const firstResponse = await firstRequest.json();
          
    const data = {
      message: "update: added new file",
      content: file.buffer.toString("base64"),
      sha: firstResponse.sha
    };

    // PUT / upload file to repo with retrieved sha
    const request = await fetch(repositoryPath, {
      method: "PUT",
      headers: {
        "Authorization": `token ${AUTH}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    const response = await request.json();
    
    // get the url link
    const fileUrl = `https://raw.githubusercontent.com/${ USERNAME }/${ REPOSITORY }/main/${ assetsPath }`;

    return fileUrl;
  } catch (err) {
    throw "Gagal POST request ke github!";
  }
}

export async function uploadFile(file) {
  return new Promise(async (resolve, reject) => {   
    try {
      // Split file type into 2 (General File Type and File Extension)
      const fileType = file.mimetype.split("/");
      const fileExtensions = file.originalname.split(".");

      // Change file original name into format of: General File Type _ Date _ File Extension
      file.modifiedname = `${ fileType[0].toUpperCase() }_${Date.now()}.${ fileExtensions[fileExtensions.length - 1].toLowerCase() }`;
      
      const fileUrl = await postFile(file);
      
      // return the resolve promise
      return resolve(fileUrl);
    } catch(e) {  
      console.log(e);
      return reject(new Error("Gagal mengupload the file!"));
    }
  });
}