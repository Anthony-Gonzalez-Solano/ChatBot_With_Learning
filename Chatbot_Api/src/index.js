import app from "../app"

app.listen(app.get('port'))

console.log('server on port', app.get('port')) //Para saber que el server corre correctamente
