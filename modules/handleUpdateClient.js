import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";
import { CLIENTS } from "../index.js";


export const handleUpdateClient = (req,res,segments) => {
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
            const updateDataClient = JSON.parse(body); 
            if(
                !updateDataClient.fullName ||
                !updateDataClient.phone ||
                !updateDataClient.ticketNumber ||
                !updateDataClient.booking                
            ){
                sendError(res,400,"wrong base data of client");
                return;
            }            
                if (updateDataClient.booking &&
                    (!updateDataClient.booking.length ||
                    !Array.isArray(updateDataClient.booking) &&
                    !updateDataClient.booking.every((item) => item.comedian && item.time))
                )
                {
                    sendError(res,400,"Wrong booking");
                    return;                                
            }
            const clientData = await fs.readFile(CLIENTS, 'utf-8');
            const clients =JSON.parse(clientData);
            const clientIndex = clients.findIndex(c => c.ticketNumber ===segments[1]);

            if (clientIndex === -1){
                sendError(res,404,"not found this ticket number")
            }
            
            clients[clientIndex] ={
                ...clients[clientIndex],
                ...updateDataClient,
            }
            await fs.writeFile(CLIENTS, JSON.stringify(clients));                      
            sendData(res,clients[clientIndex]);   
        } catch (error) {
            console.error(`error request ${error}`)
            sendError(res,500,"server error")
        }
    })

}