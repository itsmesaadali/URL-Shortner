import {Router} from 'express'
import { createShortUrl, redirectShortUrl } from '../controllers/shorturl.controller.js';

const router = Router()

router.route('/create').post(createShortUrl)
router.route('/:id').get(redirectShortUrl)

export default router;