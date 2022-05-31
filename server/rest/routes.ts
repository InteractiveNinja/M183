import { Router } from 'express';
import { DaoFactory } from '../data/factory/daoFactory';

export const apiRoutes = Router();

const daoFactory = DaoFactory.getInstance();

const userDao = daoFactory.createUserDao();
const billDao = daoFactory.createBillDao();

apiRoutes.post('/login', (req, res) => {
  userDao
    .create({
      username: 'safeSteve',
      password: 'katze1!1',
      address: '',
      city: '',
      firstname: '',
      gender: 'M',
      job: '',
      lastname: '',
    })
    .then(() => {
      userDao.findAll().then((users) => res.json(users));
    })
    .catch(() => res.status(500));
});

apiRoutes.get('/bills', (req, res) => {
  billDao
    .create({
      amount: 2000,
      deadline: new Date(),
    })
    .then(() => {
      billDao.findAll().then((bills) => {
        res.send(bills);
      });
    })
    .catch(() => res.sendStatus(500));
});
