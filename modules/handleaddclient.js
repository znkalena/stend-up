import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";
import { CLIENTS } from "../index.js";

export const handleAddClient =(req,res) =>{
    let body = '';
    try {
        req.on(data, chunk =>{
            body += chunk;
        })  
    } catch (error) {
        console.log(`error of reading request`);
        sendError(res,500,"server error")
    }
    req.on("end", async() =>{
        try {            
            const newClient = JSON.parse(body); 
            if(
                !newClient.fullName ||
                !newClient.phone ||
                !newClient.ticketNumber ||
                !newClient.booking                
            ){
                sendError(res,400,"wrong base data of client");
                return;
            }            
                if (newClient.booking &&
                    (!newClient.booking.length ||
                    !Array.isArray(newClient.booking) &&
                    !newClient.booking.every((item) => item.comedian && item.time))
                )
                {
                    sendError(res,400,"Wrong booking");
                    return;                                
            }
            const clientData = await fs.readFile(CLIENTS, 'utf-8');
            const clients =JSON.parse(clientData);
            clients.push(newClient);
            await fs.writeFile(CLIENTS, JSON.stringify(clients));                      
            sendData(res,newClient);   
        } catch (error) {
            console.error('error request')
        }
    })

}