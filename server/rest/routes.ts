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
  checkPrivilege,
  checkPrivilegeSelf,
  idSchema,
  jobSchema,
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
  '/dev/create/user',
  checkSchema(userSchema),
  checkError,
  (req: Request, res: Response) => {
    if (process.env['NODE_ENV'] != 'development') {
      return res.sendStatus(501);
    } else {
      const usersData: UserDefinition = req.body;
      return userDao
        .create(usersData)
        .then(() => res.sendStatus(200))
        .catch(() => {
          Logger.log('DEV: User was not created.');
          return res.sendStatus(500);
        });
    }
  }
);

apiRoutes.post(
  '/login',
  checkSchema(loginSchema),
  checkError,
  (req: Request, res: Response) => {
    const { username, password } = req.body;
    return userDao.findOneBy({ where: { username } }).then((user) => {
      if (user && user.checkPassword(password)) {
        return req.session.regenerate((err) => {
          Logger.log(`regenerate session for ${req.sessionID}`);
          if (err) {
            Logger.error(`could not regenerate session for ${req.sessionID}`);
            return res.sendStatus(500);
          }

          // save user into cookie
          req.session.user = user;

          // Can only sent response after cookie was saved in database, else old cookie will be sent.
          return req.session.save((err) => {
            Logger.log(`saving session for ${req.sessionID}`);
            if (err) {
              Logger.error(`could not save session for ${req.sessionID}`);
              return res.sendStatus(500);
            }
            return res.json(user);
          });
        });
      } else {
        Logger.log(`failed login from ${req.sessionID}`);
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
    Logger.log(
      `failed session login for ${session.id}, not authorized session found`
    );
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

apiRoutes.use((req: Request, res: Response, next: NextFunction) => {
  const { session } = req;
  if (session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

apiRoutes.get('/bills', checkPrivilege, (req, res) => {
  return billDao.findAll().then((bills) => res.json(bills));
});

apiRoutes.get(
  '/bills/:id',
  checkSchema(idSchema),
  checkError,
  checkPrivilegeSelf,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return billDao
      .findeAllBy({ where: { userId: id } })
      .then((bills) => (bills ? res.json(bills) : res.json([])))
      .catch(() => {
        Logger.log(`failed get on /bills/id`);
        return res.sendStatus(500);
      });
  }
);

apiRoutes.get(
  '/bill/:id',
  checkSchema(idSchema),
  checkError,
  checkPrivilege,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return billDao
      .findById(id)
      .then((bill) => (bill == null ? res.sendStatus(404) : res.json(bill)))
      .catch(() => {
        Logger.log(`failed get on /bill/id`);
        return res.sendStatus(500);
      });
  }
);

apiRoutes.post(
  '/create/bill',
  checkSchema(billSchema),
  checkError,
  checkPrivilege,
  (req: Request, res: Response) => {
    const billData: BillDefinition = req.body;
    return billDao
      .create(billData)
      .then(() => res.sendStatus(200))
      .catch(() => {
        Logger.log(`failed post on /create/bill`);
        return res.sendStatus(500);
      });
  }
);

apiRoutes.delete(
  '/delete/bill/:id',
  checkSchema(idSchema),
  checkError,
  checkPrivilege,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return billDao
      .destroy(id)
      .then(() => res.sendStatus(200))
      .catch(() => {
        Logger.log(`failed delete on /delete/bill/:id`);
        return res.sendStatus(500);
      });
  }
);

apiRoutes.post(
  '/create/user',
  checkSchema(userSchema),
  checkError,
  checkPrivilege,
  (req: Request, res: Response) => {
    const usersData: UserDefinition = req.body;
    return userDao
      .create(usersData)
      .then(() => res.sendStatus(200))
      .catch(() => {
        Logger.log('User was not created.');
        return res.sendStatus(500);
      });
  }
);

apiRoutes.get('/users', checkPrivilege, (req, res) => {
  return userDao.findAll().then((users) => res.json(users));
});

apiRoutes.get(
  '/user/:id',
  checkSchema(idSchema),
  checkError,
  checkPrivilegeSelf,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return userDao
      .findById(id)
      .then((user) => (user == null ? res.sendStatus(404) : res.json(user)))
      .catch(() => {
        Logger.log(`failed get on /user/:id`);
        return res.sendStatus(500);
      });
  }
);

apiRoutes.delete(
  '/delete/user/:id',
  checkSchema(idSchema),
  checkError,
  checkPrivilege,
  (req: Request, res: Response) => {
    const { id } = req.params;
    return userDao
      .destroy(id)
      .then(() => res.sendStatus(200))
      .catch(() => {
        Logger.log(`failed delete on /delete/user/:id`);
        return res.sendStatus(404);
      });
  }
);

apiRoutes.patch(
  '/update/user/:id',
  checkSchema(jobSchema),
  checkError,
  checkPrivilegeSelf,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { job }: UserDefinition = req.body;
    return userDao
      .findById(id)
      .then((user) => {
        if (user) {
          return user.update({ job }).then(() => res.sendStatus(200));
        }
        return Promise.reject();
      })
      .catch(() => {
        Logger.log(`failed patch on /update/user`);
        return res.sendStatus(500);
      });
  }
);
