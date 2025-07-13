// src/jugadores/jugadores.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJugadorDto } from './dto/create-jugador.dto';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectModel('Jugador') private readonly jugadorModel: Model<any>
  ) {}

  async findAll() {
    return this.jugadorModel.find().exec(); // Lista todos los jugadores
  }

  async findOne(id: string) {
    const jugador = await this.jugadorModel.findById(id).exec(); // Busca un jugador por ID
    if (!jugador) throw new NotFoundException(`Jugador con id ${id} no encontrado`);
    return jugador;
  }

  async create(createJugadorDto: CreateJugadorDto) {
    const nuevo = new this.jugadorModel(createJugadorDto); // Crea un jugador
    return nuevo.save(); // Guarda en MongoDB
  }

  async update(id: string, updateJugadorDto: CreateJugadorDto) {
    const actualizado = await this.jugadorModel.findByIdAndUpdate(id, updateJugadorDto, { new: true });
    if (!actualizado) throw new NotFoundException(`Jugador con id ${id} no encontrado`);
    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.jugadorModel.findByIdAndDelete(id);
    if (!eliminado) throw new NotFoundException(`Jugador con id ${id} no encontrado`);
    return eliminado;
  }
}
