import { Schema, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const userSchema: Schema = {
  username: {
    exists: {
      errorMessage: 'Username is not set',
      options: {
        checkNull: true,
      },
    },
    isLength: {
      errorMessage: 'Username should be between 6 and 12 chars.',
      options: {
        min: 6,
        max: 12,
      },
    },
    isString: true,
    escape: true,
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
  },
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
  },
};

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
