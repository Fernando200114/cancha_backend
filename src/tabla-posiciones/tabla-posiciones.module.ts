// src/tabla-posiciones/tabla-posiciones.module.ts

import { Module } from '@nestjs/common';
import { TablaPosicionesService } from './tabla-posiciones.service';
import { TablaPosicionesController } from './tabla-posiciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidoSchema } from '../partidos/partido.schema'; // Reutilizamos el schema de partidos

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partido', schema: PartidoSchema }])
  ],
  controllers: [TablaPosicionesController],
  providers: [TablaPosicionesService],
})
export class TablaPosicionesModule {}
