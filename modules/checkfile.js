import fs from "node:fs/promises";

export const checkFileExist =async (path) =>{
    try {
        await fs.access(path);           
    }
        catch (error) {         
        console.log("error:",error);
        console.error(`file ${path} not found`);
        return false;
    }   
    return true;
}
export const createFileNotExist =async (path) =>{
    try {
        await fs.access(path);           
    }
        catch (error) {         
        console.log("error:",error);
        await fs.writeFile(path, JSON.stringify([]));
        console.logr(`file ${path} was produced`);
        return false;
    }   
    return true;
}