import {Router} from 'express'
import { createCustomShortUrl, createShortUrl } from '../controllers/shorturl.controller.js';
import { optionalVerifyJWT, verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()

router.route('/create').post(optionalVerifyJWT , createShortUrl)
router.route('/create/custom').post(verifyJWT , createCustomShortUrl)


export default router;