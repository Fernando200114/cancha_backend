// src/jugadores/jugadores.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importa el módulo de Mongoose
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { JugadorSchema } from './jugadores.schema'; // Importa el esquema de Jugador

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jugador', schema: JugadorSchema }]) // Registra el modelo
  ],
  controllers: [JugadoresController],
  providers: [JugadoresService],
})
export class JugadoresModule {}
