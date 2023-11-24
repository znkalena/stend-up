import http from "node:http";
import fs from "node:fs/promises";
import {sendData,sendError} from './modules/send.js'
import { error } from "node:console";
import { checkFileExist,createFileNotExist } from "./modules/checkfile.js";
import { handleComediansReqest } from "./modules/handleComediansReqest.js";
import { handleAddClient} from "./modules/handleaddclient.js";
import { handleClientsRequest} from "./modules/handleclientrequest.js";
import { handleUpdateClient } from "./modules/handleUpdateClient.js";


const PORT = 8080;
const COMEDIANS = './comedians.json';
export const CLIENTS = './clients.json';

const startServer =async (port) =>{
    if (!(checkFileExist(COMEDIANS))){
        return;        
    }
    await createFileNotExist(CLIENTS);
    const data =await fs.readFile(COMEDIANS,'utf-8');
    const comedians = JSON.parse(data); 

    const server = http.createServer(async(req,res) =>{
        res.setHeader("Access-Control-Alow-Origin","*");
        try {                        
        const segments = req.url.split('/').filter(Boolean);
        
        if(req.method === "GET" && segments[0] === "comedians"){            
                handleComediansReqest(res,req,comedians,segments)
                return;                
        }
        if(req.method === "POST" && segments[0] === "clients"){
            handleAddClient(req,res);
            return;
        }

        if(req.method === "Get" && segments[0] === "clients" && segments.length === 2){
            ticketNumber = segments[1];
            handleClientsRequest(req,res,ticketNumber);
            return;
        }
        if(req.method === "PUT" && segments[0] === "clients" && segments.length === 2){
                handleUpdateClient(req,res,segments);
                return;
        }
        sendError(res,404,'Not found');
        } catch (error) {
            sendError(res,500,`server is broken:${error}`);
        }               
    });
    server.listen(port,() =>{
        console.log(`server got on adress http://localhost:${port}`);
    });
    server.on(error, (error) => {
        if(error.code === 'EADDRINUSE'){
            console.log(`Port is busy try to load on ${port +1}`);
            startServer(port +1)
        }else{
            console.error(`error: ${error}`);
        }
        
    })
    
    
}   

startServer(PORT);
