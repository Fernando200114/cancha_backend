import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { JugadoresModule } from './jugadores/jugadores.module'; // ✅ Se importa aquí tu módulo de jugadores

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ✅ Solo activado en desarrollo para crear tablas automáticamente
        ssl: { rejectUnauthorized: false },
      }),
    }),

    // ✅ Módulos importados de tu aplicación
    UsersModule,
    CategoriesModule,
    PostsModule,
    AuthModule,
    JugadoresModule, 
  ],
  controllers: [AppController], 
  providers: [AppService], 
})
export class AppModule {} // ✅ Este es el único @Module correcto
