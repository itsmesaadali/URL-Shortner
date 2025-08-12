import {Router} from 'express'
import { getAllUserUrls } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/allUrls').get(verifyJWT, getAllUserUrls)


export default router