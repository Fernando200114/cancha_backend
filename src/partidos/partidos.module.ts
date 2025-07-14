// src/partidos/partidos.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { PartidoSchema } from './partido.schema';
import { EquipoSchema } from '../equipos/equipo.schema'; // ✅ Importa el schema de Equipo

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Partido', schema: PartidoSchema },
      { name: 'Equipo', schema: EquipoSchema }, // ✅ Registra también el modelo Equipo
    ]),
  ],
  controllers: [PartidosController],
  providers: [PartidosService],
})
export class PartidosModule {}
