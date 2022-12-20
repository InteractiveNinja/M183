import * as SessionStore from 'connect-session-sequelize';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response, Router } from 'express';
import * as sessions from 'express-session';
import { Store } from 'express-session';
import { checkSchema } from 'express-validator';
import { BillDefinition } from '../data/dao/billDao';
import { UserDefinition } from '../data/dao/userDao';
import { DaoFactory } from '../data/factory/daoFactory';
import { SequelizeFactory } from '../data/factory/sequelizeFactory';
import { User } from '../data/models/user';
import { Logger } from '../util/logger';
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

const database = SequelizeFactory.getInstance().getSequelize();
const sessionStore = SessionStore(Store);

const sequelizeStore = new sessionStore({ db: database });

//Extends SessionInterface with User Model
declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

//cookie middleware
apiRoutes.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
//session middleware
apiRoutes.use(
  sessions({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay, httpOnly: true },
    resave: false,
    store: sequelizeStore,
  })
);

apiRoutes.post(
  '/create/user',
  checkSchema(userSchema),
  checkError,
  (req: Request, res: Response) => {
    const usersData: UserDefinition = req.body;
    return userDao
      .create(usersData)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  }
);

apiRoutes.post(
  '/login',
  checkSchema(loginSchema),
  checkError,
  (req: Request, res: Response) => {
    const { session } = req;
    const { username, password } = req.body;
    return userDao.findOneBy({ where: { username } }).then((user) => {
      if (user && user.checkPassword(password)) {
        const newSession = session.regenerate(() => {
          Logger.log(`regenerate session for ${req.sessionID}`);
        });
        newSession.user = user;
        return res.json(user);
      } else {
        return res.sendStatus(401);
      }
    });
  }
);

apiRoutes.post('/session', (req: Request, res: Response) => {
  const { session } = req;
  if (session.user) {
    Logger.log(`logging user via session for ${req.sessionID}`);
    return res.json(session.user);
  } else {
    return res.sendStatus(401);
  }
});

apiRoutes.post('/logout', (req: Request, res: Response) => {
  const { session } = req;
  session.destroy(() => {
    Logger.log(`destroying session for ${req.sessionID}`);
  });
  return res.sendStatus(200);
});

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

apiRoutes.use((req: Request, res: Response, next: NextFunction) => {
  const { session } = req;
  if (session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

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
      .then((bills) => (bills ? res.json(bills) : res.json([])))
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
      .then((bill) => (bill == null ? res.sendStatus(404) : res.json(bill)))
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
      .then((changedEntries) =>
        changedEntries >= 1 ? res.sendStatus(200) : res.sendStatus(400)
      )
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
      .then((user) => (user == null ? res.sendStatus(404) : res.json(user)))
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
