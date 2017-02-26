var compression = require('compression')
var express = require('express')
var path = require('path')
var app = express()
app.use(compression())
app.use(require('connect-history-api-fallback')())
app.use(express.static(path.join(__dirname, '../dist')))
var server = app.listen(8080, function() {
    console.log('Remote PAD app listening on port 8080')
})

var gracefulShutdown = function() {
    console.log("Received kill signal, shutting down gracefully.")
    server.close(function() {
        console.log("Closed out remaining connections.")
        process.exit()
    })

    // if after
    setTimeout(function() {
        console.error("Could not close connections in time, forcefully shutting down")
        process.exit()
    }, 5 * 1000)
}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown)

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown)
