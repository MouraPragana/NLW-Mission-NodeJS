import { Request, Response, NextFunction, response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  Response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      'd04fcb0d51e29a82bfba21642ac7e157'
    ) as IPayload;
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
