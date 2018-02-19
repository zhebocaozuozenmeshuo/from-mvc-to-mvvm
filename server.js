const http = require('http')
const url = require('url')
const fs = require('fs')
const log = function() {
  console.log.apply(console, arguments)
}
const now = function() {
  var d = new Date()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var hour = d.getHours()
  var minute = d.getMinutes()
  var second = d.getSeconds()

  return `${year}${month}${day}${hour}${minute}${second}`
}

let port = process.argv[2]
if (!port) {
  log(` 请指定端口行不行?\n node server.js 8888 很难么?`)
  process.exit(1)
}

var server = http.createServer(function(request, response){
  let parsedUrl = url.parse(request.url, true)
  let pathWithQuery = request.url
  let queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /*************emms, 上面的不懂也没关系啊...**************************************/
  log(`瓜坤说: 你的带参数请求路径为 \n ${pathWithQuery}`)
  if (path === '/') {
    let string = fs.readFileSync('./index.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/friends/1'  && method === 'GET') {
    let string = `mock data use`
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/friends/2'  && method === 'GET') {
    let string = `mock data use`
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }  else if (path === '/friends/3'  && method === 'GET') {
    let string = `mock data use`
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }
})

function readBody(request) {
  return new Promise((resolve, reject)=>{
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      resolve(body)
    })
  })
}

server.listen(port)
log(`服务器已经在 ${port} 端口启动了监听服务\n 请在空中旋转720度然后用电饭煲打开 http://localhost:${port}`)
