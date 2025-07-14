// src/equipos/equipos.module.ts

// src/equipos/equipos.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importa Mongoose
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { EquipoSchema } from './equipo.schema'; // Asegúrate que este archivo exista con el schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Equipo', schema: EquipoSchema }]) // Registra el modelo
  ],
  controllers: [EquiposController],
  providers: [EquiposService],
})
export class EquiposModule {}
