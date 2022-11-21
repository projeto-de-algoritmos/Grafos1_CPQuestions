import express from 'express';
import EdgeController from '../controllers/edge';

const router = express.Router();

router.post('/:id/add/', EdgeController.addEdge);
// router.post('/remove/', EdgeController.removeEdge);

export default router;