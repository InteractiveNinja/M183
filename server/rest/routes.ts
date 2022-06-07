import { Router } from 'express';
import { DaoFactory } from '../data/factory/daoFactory';
import { UserDefinition } from '../data/dao/userDao';
import { BillDefinition } from '../data/dao/billDao';

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

apiRoutes.get('/bill/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    billDao.findById(id).then((bill) => {
      if (bill == null) {
        res.sendStatus(404);
        return;
      }
      res.json(bill);
    });
    return;
  }

  res.sendStatus(400);
});

apiRoutes.post('/create/bill', (req, res) => {
  // todo adds checking for fields
  const billDefinition: BillDefinition = req.body;
  billDao
    .create(billDefinition)
    .then(() => {
      res.sendStatus(200);
      return;
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

apiRoutes.get('/users', (req, res) => {
  userDao.findAll().then((users) => {
    res.json(users);
  });
});

apiRoutes.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    userDao.findById(id).then((user) => {
      if (user == null) {
        res.sendStatus(404);
        return;
      }
      res.json(user);
    });
    return;
  }

  res.sendStatus(400);
});

apiRoutes.post('/create/user', (req, res) => {
  // todo adds checking for fields
  const usersData: UserDefinition = req.body;
  userDao.create(usersData).then(() => {
    res.sendStatus(200);
    return;
  });
  res.sendStatus(400);
});
