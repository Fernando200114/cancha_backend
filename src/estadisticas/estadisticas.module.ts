// src/estadisticas/estadisticas.module.ts

import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { MongooseModule } from '@nestjs/mongoose'; // Importa el módulo Mongoose
import { JugadorSchema } from '../jugadores/jugadores.schema'; // Reutiliza el schema de jugadores

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jugador', schema: JugadorSchema }]) // Importa el modelo Jugador para usarlo en este módulo
  ],
  controllers: [EstadisticasController], // Controlador de rutas HTTP
  providers: [EstadisticasService], // Servicio con lógica de negocio
})
export class EstadisticasModule {}
