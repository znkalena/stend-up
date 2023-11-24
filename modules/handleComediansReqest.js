import { sendData,sendError } from "./send.js";

export const handleComediansReqest =async(res,req,comedians,segments) => {               
    if(segments.length === 2){
        const comedian = comedians.find(c => c.id === segments[1]);        
        if(!comedian){                       
        sendError(res,404,errorMessage);
        return;
        }
        sendData(res,comedian);        
    }
    sendData(res,comedians);
}