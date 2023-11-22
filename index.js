import http from "node:http";
import fs from "node:fs/promises";

//fs.readFile("package.json", "utf-8",(err,data) =>{
//    console.log(data);
//});

    

http.createServer(async(req,res) =>{
    if(req.method === "GET" && req.url === "/comedians"){
        try {
            const data = await fs.readFile('comedians.json','utf-8')
            res.writeHead(200,{
                "Content-Type":"text/json",
                "access-control-allow-origin":"*",
            });
            res.end(data);    
        } catch (error) {
            res.writeHead(500);
            res.end(`server is broken:${error}`) 
        }
        
    }else{
        res.writeHead(404);
        res.end('Not found');
    }    
}).listen(8040);

console.log("server got on adress http://localhost:8040");
