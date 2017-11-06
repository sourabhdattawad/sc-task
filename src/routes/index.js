import express from 'express';
import user from './user';
import admin from './admin';
import tokenverfication from '../middleware/tokenverfication';
const router = express.Router();


//call all routes, pass middleware if required
router.use('/user', user);
router.use('/admin', tokenverfication, admin);


export default router;