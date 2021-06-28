import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
export default function ensureAuthenticated(
  req: Request,async
  res: Response,
  next: NextFunction,
): void {
  cPromise<void> { token } = request.body;
  const client = new OAuth2Client(
    '667162433343-bm972dcjeoonb5tmhdho0jhnlm0th75k.apps.googleusercontent.com',
  );

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,

      audience: [
        '667162433343-bm972dcjeoonb5tmhdho0jhnlm0th75k.apps.googleusercontent.com',
        '667162433343-2lns20c78qkvls7c893vr78s0636g3o0.apps.googleusercontent.com',
      ],
    });
    const payload = ticket.getPayload();
    const userid = payload?.sub;
    console.log(payload);
    console.log(userid);
    return response.json({ msg: 'true' });
  } catch (error) {
    console.error(error);
    return response.json({ msg: 'false' });
  }
}
