import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/user.model.js';
import { config } from './env.js';

const cookieExtractor = (req) => {
  return req?.cookies?.token || null;
};

passport.use(
  'current',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.jwtSecret,
    },
    async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;