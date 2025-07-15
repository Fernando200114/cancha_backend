// src/equipos/equipos.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { EquipoSchema } from './equipo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Equipo', schema: EquipoSchema }])
  ],
  controllers: [EquiposController],
  providers: [EquiposService],
  exports: [
    MongooseModule, // 👈 Esto es lo que necesitas para usar el modelo Equipo en otro módulo
  ],
})
export class EquiposModule {}
