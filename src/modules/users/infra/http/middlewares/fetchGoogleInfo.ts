import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

export default async function fetchGoogleInfo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    throw new AppError('JWT Token is Missing', 404);
  }

  try {
    const response = await axios.get(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    req.body = {
      ...response.data,
      birth_date: req.body.birth_date,
    };

    return next();
  } catch {
    throw new AppError('JWT Token is Invalid', 401);
  }
}
