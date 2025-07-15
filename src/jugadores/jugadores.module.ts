// src/jugadores/jugadores.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { JugadorSchema } from './jugadores.schema';
import { EquiposModule } from '../equipos/equipos.module'; // 👈 Importar el módulo de equipos

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jugador', schema: JugadorSchema }]),
    EquiposModule, // 👈 Agregado para que funcione el populate correctamente
  ],
  controllers: [JugadoresController],
  providers: [JugadoresService],
})
export class JugadoresModule {}
