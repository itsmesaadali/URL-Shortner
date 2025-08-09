import {Router} from 'express'
import { createShortUrl } from '../controllers/shorturl.controller.js';

const router = Router()

router.route('/create').post(createShortUrl)


export default router;