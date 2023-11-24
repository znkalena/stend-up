import { CLIENTS } from "../index.js";
import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";

export const handleClientsRequest = async(req,res,ticketNumber) =>{
try {
    const clientsData = await fs.readFile(CLIENTS, "utf-8");
    const clients = JSON.parse(clientsData);
    const client =clients.find(c =>c.ticketNumber === ticketNumber);
    if(!client){
        sendError(res,400,"client with such ticket not found");
        return;
    }

    sendData(res,client);
} catch (error) {
    console.error(`error request ${error}`);
    sendError(res,500,"server error request")
}
}