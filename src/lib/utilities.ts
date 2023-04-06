import fs from "node:fs";
import path from "node:path";
export function moveFile(oldPath: string, filename: string) {
  let newPath = path.join(__dirname, "../../public/avatars", filename);
  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err;
    console.log(`Fichier déplacé : ${oldPath} vers ${newPath}`);
  });
}

export function removeAvatar(filename: string) {
  let filePath = path.join(__dirname, "../../public/avatars", filename);
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    throw new Error("Une erreur s'est produite");
  }
}
