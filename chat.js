const http = require("http");
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

const filePath = path.join(__dirname, 'chat.m3u')

http.createServer(function(req, res){
     if(req.url === '/chat.m3u'){
        
             fetch('https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=HNwJw&client_ip=172.70.54.110&limit=500&gender=f')
            .then(response => response.json())
            .then(rooms => buildM3U(rooms))
            .then( m3u => fs.writeFile(filePath, m3u, err => {
             if (err){
  throw err
}
console.log('write');
             }) );
                      res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=chat.m3u"
          });
          fs.createReadStream(filePath).pipe(res);
        
        }
	
    
}).listen(8080);

async function buildM3U(rooms) {
      var keys = rooms['results'];
      var logo="";
      var m3u="#EXTM3U"+"\n";
      for (var i = 0; i < keys.length; i++) {
        var file = keys[i]; 
        var link = 'https://edge10-sof.live.mmcdn.com/live-edge/amlst:'
        var link2 = '/playlist.m3u8'
        var logo=file['image_url'];
        var name=file['username'];
        
            m3u+= '#EXTINF:-1 tvg-logo="'+logo+'"'+", "+name+"\n" + link + name + link2 + "\n";
          
        } 
        return m3u
      }