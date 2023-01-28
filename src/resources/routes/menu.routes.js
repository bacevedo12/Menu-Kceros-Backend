import { Router } from 'express'
import { createPlato, deletePlatoById, getPlatos, getPlatoById, updatePlatoById } from '../controllers/menu.controller.js';


const platosRouter = Router()


const baseURI = '/platos'

platosRouter.post( baseURI, createPlato )
platosRouter.get( baseURI, getPlatos )
platosRouter.get( `${ baseURI }/:id`, getPlatoById )
platosRouter.put( `${ baseURI }/:id`, updatePlatoById )
platosRouter.delete( `${ baseURI }/:id`, deletePlatoById )

export default platosRouter