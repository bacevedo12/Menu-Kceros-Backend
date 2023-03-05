import express from 'express';
import { startConnection } from './config/database.config.js';
import environment from './config/environment.js';
import usuariosRouter from './resources/routes/usuarios.routes.js';
import menuRouter from './resources/routes/menu.routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload'
// import authRouter from './resources/routes/auth.routes.js'; 

// Se crea una instancia de una aplicación express
const app = express();

// Iniciamos la conexión a la base de datos
startConnection()

// Se configura un middleware para aceptar requests de tipo JSON
app.use( express.json() )

// const whitelist = [
//     "",
// ]


app.use(cors());

app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));



//para poder cargr archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Se agrega una ruta (endpoint) por defecto
app.get( '/', function ( req, res ) {
 res.json( { message: "hola mundo" } );
} );

// Se agrega el endpoint de products
app.use( usuariosRouter )
app.use( menuRouter )
// app.use( authRouter )

// Se inicia la aplicación y se queda escuchando requests
console.log( `APLICATION INICIARÁ EN EL PUERTO: ${ environment.PORT }` )
app.listen( environment.PORT );