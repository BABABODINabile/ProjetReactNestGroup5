import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AttachementsModule } from './attachements/attachements.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'projetReactNestgroupe5',
      autoLoadEntities: true,
      synchronize: true, // On devra le garder uniquement en dev
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CategoriesModule,
    TransactionsModule,
    AttachementsModule,
  ],
})
export class AppModule {}