import { Router } from 'express';
import { DaoFactory } from '../data/factory/daoFactory';

export const apiRoutes = Router();

const daoFactory = DaoFactory.getInstance();

const userDao = daoFactory.createUserDao();
const billDao = daoFactory.createBillDao();

apiRoutes.post('/login', (req, res) => {
  //todo implements login aka. credentials check
});

apiRoutes.get('/bills', (req, res) => {
  billDao.findAll().then((bills) => {
    res.json(bills);
  });
});

apiRoutes.get('/users', (req, res) => {
  userDao.findAll().then((users) => {
    res.json(users);
  });
});
