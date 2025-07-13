// src/tarjetas/tarjetas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';

@Injectable()
export class TarjetasService {
  constructor(
    @InjectModel('Tarjeta') private readonly tarjetaModel: Model<any>
  ) {}

  async findAll() {
    return this.tarjetaModel.find().exec(); // Devuelve todas las tarjetas
  }

  async findByJugador(jugadorId: string) {
    return this.tarjetaModel.find({ jugadorId }).exec(); // Tarjetas de un jugador
  }

  async create(dto: CreateTarjetaDto) {
    const tarjeta = new this.tarjetaModel(dto); // Crea una nueva tarjeta
    return tarjeta.save(); // Guarda en MongoDB
  }

  async remove(id: string) {
    const eliminado = await this.tarjetaModel.findByIdAndDelete(id);
    if (!eliminado) throw new NotFoundException(`Tarjeta con id ${id} no encontrada`);
    return eliminado;
  }
}
