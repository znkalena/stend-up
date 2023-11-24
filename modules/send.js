export const sendData =(res,data) => {
    res.writeHead(200,{
        "Content-Type":"text/json",        
    });
    res.end(JSON.stringify(data));
}
export const sendError = (res,statusCode,errorMessage) => {
    res.writeHead(statusCode,{
        "Content-Type":"text/plain",
    });
    res.end(errorMessage);
}
