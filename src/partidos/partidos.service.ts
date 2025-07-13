
// src/partidos/partidos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartidoDto } from './dto/create-partido.dto';

@Injectable()
export class PartidosService {
  constructor(
    @InjectModel('Partido') private readonly partidoModel: Model<any>
  ) {}

  async findAll() {
    return this.partidoModel.find().exec(); // Lista todos los partidos
  }

  async findOne(id: string) {
    const partido = await this.partidoModel.findById(id).exec(); // Busca partido por ID
    if (!partido) throw new NotFoundException(`Partido con id ${id} no encontrado`);
    return partido;
  }

  async create(createPartidoDto: CreatePartidoDto) {
    const partido = new this.partidoModel(createPartidoDto); // Crea un nuevo partido
    return partido.save(); // Guarda en MongoDB
  }

  async update(id: string, updatePartidoDto: CreatePartidoDto) {
    const actualizado = await this.partidoModel.findByIdAndUpdate(id, updatePartidoDto, { new: true });
    if (!actualizado) throw new NotFoundException(`Partido con id ${id} no encontrado`);
    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.partidoModel.findByIdAndDelete(id);
    if (!eliminado) throw new NotFoundException(`Partido con id ${id} no encontrado`);
    return eliminado;
  }
}
