import { Router } from 'express';
import { DaoFactory } from '../data/factory/dao.factory';

export const apiRoutes = Router();

const daoFactory = DaoFactory.getInstance();

const userDao = daoFactory.createUserDao();

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
