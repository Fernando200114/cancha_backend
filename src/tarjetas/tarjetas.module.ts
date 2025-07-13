// src/tarjetas/tarjetas.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TarjetasService } from './tarjetas.service';
import { TarjetasController } from './tarjetas.controller';
import { TarjetaSchema } from './tarjeta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tarjeta', schema: TarjetaSchema }])
  ],
  controllers: [TarjetasController],
  providers: [TarjetasService],
})
export class TarjetasModule {}
