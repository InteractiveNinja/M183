import { Router } from 'express';

export const apiRoutes = Router();

apiRoutes.post('/login', (req, res) => {
  res.sendStatus(200);
});
