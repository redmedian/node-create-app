// @flow
import express from 'express';

import * as BookController from '../controllers/book';

const router = express.Router();

router.get('/books', BookController.getAll);
router.post('/books', BookController.create);
router.get('/books/:id', BookController.getBook);
router.put('/books/:id', BookController.editBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;
