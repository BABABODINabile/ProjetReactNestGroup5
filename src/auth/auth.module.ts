import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // 1. Ajoutez cet import

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // 2. Ajoutez cet import
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    // 3. Enregistrez PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_dev',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  // 4. Ajoutez JwtStrategy ici pour l'activer
  providers: [AuthService, JwtStrategy], 
  controllers: [AuthController],
  exports: [AuthService], // Optionnel : utile si d'autres modules ont besoin d'AuthService
})
export class AuthModule {}