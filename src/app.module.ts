// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';

// // Módulos de tu app
// import { JugadoresModule } from './jugadores/jugadores.module';
// import { EquiposModule } from './equipos/equipos.module';
// import { GolesModule } from './goles/goles.module';
// import { TarjetasModule } from './tarjetas/tarjetas.module';
// import { PartidosModule } from './partidos/partidos.module';
// import { TablaPosicionesModule } from './tabla-posiciones/tabla-posiciones.module';
// import { EstadisticasModule } from './estadisticas/estadisticas.module';

// // Entidades de PostgreSQL
// import { Jugador } from './entities/jugador.entity';
// import { Equipo } from './entities/equipo.entity';
// import { Gol } from './entities/gol.entity';
// import { Tarjeta } from './entities/tarjeta.entity';
// import { Partido } from './entities/partido.entity';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     // MongoDB Atlas
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGO_URI'),
//       }),
//     }),

//     // PostgreSQL (Neon)
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
//         username: configService.get<string>('DB_USER'),
//         password: configService.get<string>('DB_PASS'),
//         database: configService.get<string>('DB_NAME'),
//         entities: [Jugador, Equipo, Gol, Tarjeta, Partido],
//         synchronize: true,
//         ssl: { rejectUnauthorized: false },
//       }),
//     }),

//     // Módulos funcionales
//     JugadoresModule,
//     EquiposModule,
//     GolesModule,
//     TarjetasModule,
//     PartidosModule,
//     TablaPosicionesModule,
//     EstadisticasModule,
//   ],

//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}






import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de tu app (solo MongoDB)
import { JugadoresModule } from './jugadores/jugadores.module';
import { EquiposModule } from './equipos/equipos.module';
import { GolesModule } from './goles/goles.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { PartidosModule } from './partidos/partidos.module';
import { TablaPosicionesModule } from './tabla-posiciones/tabla-posiciones.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

// Módulos de PostgreSQL (usuarios y auth)
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

// Entidades de PostgreSQL
import { Usuario } from './usuarios/usuario.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MongoDB Atlas
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    // PostgreSQL (Neon)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Usuario], // ✅ SOLO entidad de usuarios
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
    }),

    // Módulos funcionales (MongoDB)
    JugadoresModule,
    EquiposModule,
    GolesModule,
    TarjetasModule,
    PartidosModule,
    TablaPosicionesModule,
    EstadisticasModule,

    // Módulos funcionales (PostgreSQL)
    UsuariosModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
