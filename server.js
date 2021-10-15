const fs = require('fs')
const http = require('http')
const {v4 : uuidv4} = require('uuid')

const server = http.createServer((request,response)=>{
    const takeURL = request.url.split('/')
    switch(takeURL[1]){
        case "html":
        
            fs.readFile("index.html","utf-8",(err,data)=>{
                if(err){
                    response.writeHead(400,{"content-type":"application/json"})
                    response.end(JSON.stringify({
                        data:"HTML file is not present"
                    }))
                }
                else{
                    response.writeHead(200,{"content-type":"text/html"})
                    response.end(data)
                }
            })
            break
        case "json":
            
            fs.readFile("data.json","utf-8",(err,data)=>{
                if(err){
                    response.writeHead(400,{"content-type":"application/json"})
                    response.end(JSON.stringify({
                        data:"JSON file is not present"
                    }))
                }
                else{
                    response.writeHead(200,{"content-type":"application/json"})
                    response.end(data)
                }
            })
            break
        case 'uuid':
            const newuuid=uuidv4()
            try{
                response.writeHead(200,{"content-type":"application/json"})
                response.end(JSON.stringify({
                    "uuid":newuuid
                },null,2))
            }
            catch{
                response.writeHead(400,{"content-type":"application/json"})
                response.end("uuid is  not valid")
            }
            break
        case 'status':
            try{
                const status_code = http.STATUS_CODES
                if(takeURL.length<3){
                    throw err;
                }
                else{
                    response.writeHead(parseInt(takeURL[2]))
                    response.write(status_code[takeURL[2]])
                    response.end()
                }
                
            }
            catch(err){
                response.writeHead(400,{"content-type":"application/json"})
                response.end("status code is  not valid")
            }
            break
        case 'delay':

            const totalDelayTime = parseInt(takeURL[2])
            setTimeout(() => {
                try{
                    response.writeHead(200,{"content-type":"text/html"})
                    response.end(`<h1>Waiting for ${totalDelayTime} seconds</h1>`)
                }
                catch(err){
                    console.log(err.message)
                }
                
            }, totalDelayTime*1000);

            break
        default:
            
            response.end("server has been started")
        

    }
    
})


server.listen(8021,()=>{
    console.log("server started")
}) 