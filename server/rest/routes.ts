import { Request, Response, Router } from 'express';
import { DaoFactory } from '../data/factory/daoFactory';
import { UserDefinition } from '../data/dao/userDao';
import { BillDefinition } from '../data/dao/billDao';
import { v4 as generateUUID } from 'uuid';
import * as cookieparser from 'cookie-parser';
import { checkSchema } from 'express-validator';
import {
  billSchema,
  checkError,
  idSchema,
  loginSchema,
  userSchema,
} from './validatorSchemas';

export const apiRoutes = Router();
const daoFactory = DaoFactory.getInstance();

const userDao = daoFactory.createUserDao();
const billDao = daoFactory.createBillDao();


apiRoutes.post(
  '/create/user',
  checkSchema(userSchema),
  checkError,
  (req: Request, res: Response) => {
    const usersData: UserDefinition = req.body;
    return userDao
      .create(usersData)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  }
);

apiRoutes.post(
  '/login',
  checkSchema(loginSchema),
  checkError,
  (req: Request, res: Response) => {
    const {username, password} = req.body;
    userDao.findOneBy({where: {username}}).then((user) => {
      if (user && user.checkPassword(password)) {
        return res
          .json(user);
      }
      return res.sendStatus(401);
    });
  }
);


apiRoutes.get('/bills', (req, res) => {
  return billDao.findAll().then((bills) => res.json(bills));
});

apiRoutes.get(
  '/bills/:id',
  checkSchema(idSchema),
  checkError,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return billDao
      .findeAllBy({ where: { userId: id } })
      .then((bills) => bills ? res.json(bills) : res.json([]))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.get(
  '/bill/:id',
  checkSchema(idSchema),
  checkError,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return billDao
      .findById(id)
      .then((bill) => bill == null ? res.sendStatus(404) : res.json(bill))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.post(
  '/create/bill',
  checkSchema(billSchema),
  checkError,
  (req: Request, res: Response) => {
    const billData: BillDefinition = req.body;
    return billDao
      .create(billData)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.delete(
  '/delete/bill/:id',
  checkSchema(idSchema),
  checkError,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return billDao
      .destroy(id)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.patch(
  '/update/bill',
  checkSchema(billSchema),
  checkError,
  (req: Request, res: Response) => {
    const billData: BillDefinition = req.body;
    return billDao
      .update(billData)
      .then((changedEntries) => changedEntries >= 1 ? res.sendStatus(200) : res.sendStatus(400))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.get('/users', (req, res) => {
  return userDao.findAll().then((users) => res.json(users));
});

apiRoutes.get(
  '/user/:id',
  checkSchema(idSchema),
  checkError,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return userDao
      .findById(id)
      .then((user) => user == null ? res.sendStatus(404) : res.json(user))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.delete(
  '/delete/user/:id',
  checkSchema(idSchema),
  checkError,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return userDao
      .destroy(id)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(404));
  }
);

apiRoutes.patch(
  '/update/user',
  checkSchema(userSchema),
  checkError,
  (req: Request, res: Response) => {
    const usersData: UserDefinition = req.body;
    return userDao
      .update(usersData)
      .then((changedEntries) => {
        changedEntries >= 1 ? res.sendStatus(200) : res.sendStatus(400);
      })
      .catch(() => res.sendStatus(500));
  }
);
