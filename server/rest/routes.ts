import { Router } from 'express';
import { DaoFactory } from '../data/factory/daoFactory';
import { UserDefinition } from '../data/dao/userDao';
import { BillDefinition } from '../data/dao/billDao';
import { v4 as generateUUID } from 'uuid';
import * as cookieparser from 'cookie-parser';


export const apiRoutes = Router();
const daoFactory = DaoFactory.getInstance();

const userDao = daoFactory.createUserDao();
const billDao = daoFactory.createBillDao();

let cookies = new Map();

apiRoutes.post('/create/user', (req, res) => {
  // todo adds checking for fields
  const usersData: UserDefinition = req.body;
  userDao
    .create(usersData)
    .then(() => {
      res.sendStatus(200);
      return;
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

apiRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;
  userDao.findOneBy({ where: { username } }).then((user) => {
    if (user && user.checkPassword(password)) {
      const cookie = generateUUID();
      res
        .status(200)
        .cookie('uuid', cookie, { maxAge: 360000 })
        .json({ user, cookie });
      cookies.set(cookie, user);
      return;
    }
    res.status(401).json('not ok');
  });
});

apiRoutes.post('/session', (req, res) => {
  const { session } = req.body;
  const found = cookies.get(session) != undefined;
  if (found) {
    const user = cookies.get(session);
    res.status(200).json(user);
    return;
  }

  res.clearCookie('uuid').status(401).json('not ok');
});

apiRoutes.post('/logout', (req, res) => {
  res.clearCookie('uuid').json('done');
});

apiRoutes.use(cookieparser());
apiRoutes.use((req, res, next) => {
  const { uuid } = req.cookies;
  const found = cookies.get(uuid) != undefined;
  if (!found) {
    res.clearCookie('uuid').status(401).json('no session');
    return;
  }
  next();
});

apiRoutes.get('/bills', (req, res) => {
  billDao.findAll().then((bills) => {
    res.json(bills);
  });
});

apiRoutes.get('/bills/:userid', (req, res) => {
  const { userid } = req.params;
  const userId = parseInt(userid);
  billDao.findeAllBy({ where: { userId } }).then((bills) => {
    if (bills) {
      res.status(200).json(bills);
      return;
    }
    res.status(404).json([]);
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
  const billData: BillDefinition = req.body;
  billDao
    .create(billData)
    .then(() => {
      res.sendStatus(200);
      return;
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

apiRoutes.delete('/delete/bill/:id', (req, res) => {
  const { id } = req.params;
  billDao
    .destroy(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => res.sendStatus(404));
});

apiRoutes.patch('/update/bill', (req, res) => {
  // todo fields checking
  const billData: BillDefinition = req.body;
  billDao
    .update(billData)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => res.sendStatus(400));
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



apiRoutes.delete('/delete/user/:id', (req, res) => {
  const { id } = req.params;
  userDao
    .destroy(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => res.sendStatus(404));
});

apiRoutes.patch('/update/user', (req, res) => {
  // todo fields checking
  const usersData: UserDefinition = req.body;
  userDao
    .update(usersData)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => res.sendStatus(400));
});
