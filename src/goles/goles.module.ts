// src/goles/goles.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importa Mongoose
import { GolesService } from './goles.service';
import { GolesController } from './goles.controller';
import { GolSchema } from './gol.schema'; // Importa el esquema Gol

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gol', schema: GolSchema }]) // Registra el modelo Gol
  ],
  controllers: [GolesController], // Controlador para las rutas HTTP
  providers: [GolesService], // Lógica del módulo
})
export class GolesModule {}
