import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { googleContants } from './constants';
import { OAuth2Strategy, VerifyCallback } from 'passport-google-oauth';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  OAuth2Strategy.Strategy,
  'googleAdmin',
) {
  constructor() {
    super({
      clientID: googleContants.client,
      clientSecret: googleContants.secret,
      callbackURL: 'http://localhost:3000/authAdmin/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}