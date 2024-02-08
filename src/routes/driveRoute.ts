import { Router } from 'express';
import DriveController from '../controllers/driveController';

const router = Router();

router.get('/readAll', DriveController.getAllFiles);
// router.get('/auth', DriveController.authenticateWithGoogleDrive);
// router.get('/readOne/:idFile', DriveController.getFile);
// router.post('/create', DriveController.uploadImage);

export default router;