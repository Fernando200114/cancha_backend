// src/partidos/partidos.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { PartidoSchema } from './partido.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partido', schema: PartidoSchema }]) // Registra el modelo Partido
  ],
  controllers: [PartidosController],
  providers: [PartidosService],
})
export class PartidosModule {}
