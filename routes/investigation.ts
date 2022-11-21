import express from 'express';
import InvestController from '../controllers/investigation';

const router = express.Router();

router.get('/', InvestController.getAll);
router.get('/:id/', InvestController.getGraph);

router.post('/', InvestController.createGraph);
router.post('/:id/', InvestController.createVertex);

export default router;