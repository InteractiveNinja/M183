import { NextFunction, Request, Response } from 'express';
import { Schema, validationResult } from 'express-validator';

export const loginSchema: Schema = {
  username: {
    exists: {
      errorMessage: 'Username is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Username should be between 6 and 16 chars.',
      options: {
        min: 6,
        max: 16,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([a-z0-9]+)$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  password: {
    exists: {
      errorMessage: 'Password is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Password should be between 8 and 64 chars.',
      options: {
        min: 8,
        max: 64,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([a-z0-9!"#$%&'()*+,-./\\:;<=>?@\[\]^_`{|}~]+)$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
};

export const userSchema: Schema = {
  ...loginSchema,
  firstname: {
    exists: {
      errorMessage: 'Firstname is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Firstname should be between 1 and 25 chars.',
      options: {
        min: 1,
        max: 25,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([a-z]+)$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  lastname: {
    exists: {
      errorMessage: 'Lastname is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Lastname should be between 1 and 25 chars.',
      options: {
        min: 1,
        max: 25,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([a-z]+)$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  gender: {
    exists: {
      errorMessage: 'Gender is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Gender should be only 1 chars.',
      options: {
        min: 1,
        max: 1,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([mfo])$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  address: {
    exists: {
      errorMessage: 'Address is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Address should be between 1 and 64 chars.',
      options: {
        min: 1,
        max: 64,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^[\w\s.]+$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  city: {
    exists: {
      errorMessage: 'City is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'City should be between 1 and 16 chars.',
      options: {
        min: 1,
        max: 16,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([a-z]+)$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  job: {
    exists: {
      errorMessage: 'Job is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Job should be between 1 and 32 chars.',
      options: {
        min: 1,
        max: 32,
      },
    },
    isString: true,
    escape: true,
    matches: {
      options: /^([a-z]+)$/i,
      errorMessage: 'Not allowed characters used',
    },
  },
  admin: {
    exists: {
      errorMessage: 'admin is not set',
      options: {
        checkNull: true,
      },
    },
    isBoolean: true,
  },
};

export const idSchema: Schema = {
  id: {
    in: ['params'],
    exists: {
      errorMessage: 'Id is not set',
      options: {
        checkNull: true,
      },
    },
    isInt: true,
  },
};

export const billSchema: Schema = {
  amount: {
    exists: {
      errorMessage: 'Amount is not set',
      options: {
        checkNull: true,
      },
    },
    isInt: true,
    custom: {
      options: (number) => {
        return number > 0;
      },
      errorMessage: 'Amount is not bigger then 0',
    },
  },
  deadline: {
    exists: {
      errorMessage: 'Deadline is not set',
      options: {
        checkNull: true,
      },
    },
    isDate: true,
    custom: {
      options: (date) => {
        return new Date(date) > new Date();
      },
      errorMessage: 'Date is not in the future',
    },
  },
  paid: {
    exists: {
      errorMessage: 'paid is not set',
      options: {
        checkNull: true,
      },
    },
    isBoolean: true,
  },
  UserId: {
    exists: {
      errorMessage: 'Userid is not set',
      options: {
        checkNull: true,
      },
    },
    isInt: true,
  },
};

/**
 * Checks if any Validation errors exists, returns 400 error or does nothing
 * @param req
 * @param res
 * @param next
 */
export function checkError(req: Request, res: Response, next: NextFunction) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors
        .array()
        .map(({ value, param, msg }) => ({ value, param, msg })),
    });
  }
  return next();
}

export function checkPrivilegeSelf(req: Request, res: Response, next: NextFunction) {

  const { requestId } = req.params;
  let requesterId  = req.session.user?.id;

  if ( requesterId == parseInt(requestId)) {
    return next();
  }
  return res.sendStatus(401);
}

export function checkPrivilege(req: Request, res: Response, next: NextFunction) {

  if ( req.session.user?.admin) {
    return next();
  }
  return res.sendStatus(401);
}
