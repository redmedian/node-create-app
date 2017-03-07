import express from 'express';

import * as PageController from '../controllers/page';

const router = express.Router();

router.get('/pages', PageController.getAll);
router.post('/pages', PageController.create);
router.get('/pages/:id', PageController.getPage);
router.put('/pages/:id', PageController.editPage);
router.delete('/pages/:id', PageController.deletePage);

export default router;
