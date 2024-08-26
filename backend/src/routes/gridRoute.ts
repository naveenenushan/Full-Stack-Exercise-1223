import express from 'express';
import { getGrid } from '../controllers/gridController';

const grid = express.Router();



grid.post('/', getGrid);

export default grid;


