import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: ConfigService,
    private usersService: UserService,
  ) {
    super({
      clientID: config.get('OAUTH_GOOGLE_ID'),
      clientSecret: config.get('OAUTH_GOOGLE_SECRET'),
      callbackURL: config.get('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  } 
 
  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, emails, name } = profile;

    const email = emails?.[0]?.value;

    if (!email) {
      throw new Error('No email returned from Google');
    }

    // Busca si el usuario ya existe
    let user = await this.usersService.findOne(email);


    // Retorna el usuario (Passport lo agregará a req.user)
    return user;
  }
}
