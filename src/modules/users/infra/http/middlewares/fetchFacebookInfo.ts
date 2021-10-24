import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

export default async function fetchFacebookInfo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    throw new AppError('JWT Token is Missing', 404);
  }

  try {
    const { data } = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${accessToken}`,
    );

    req.body = {
      name: data.name,
      email: data.email,
      picture: data.picture.data.url,
      birth_date: req.body.birth_date,
    };

    return next();
  } catch {
    throw new AppError('JWT Token is Invalid', 401);
  }
}
