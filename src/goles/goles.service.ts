// src/goles/goles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; // Inyectar modelo
import { Model } from 'mongoose';
import { CreateGolDto } from './dto/create-gol.dto';

@Injectable()
export class GolesService {
  constructor(
    @InjectModel('Gol') private readonly golModel: Model<any> // Inyecta el modelo Gol
  ) {}

  async findAll() {
    return this.golModel.find().exec(); // Devuelve todos los goles registrados
  }

  async findByPartido(partidoId: string) {
    return this.golModel.find({ partidoId }).exec(); // Devuelve goles de un partido específico
  }

  async create(createGolDto: CreateGolDto) {
    const nuevoGol = new this.golModel(createGolDto); // Crea el gol
    return nuevoGol.save(); // Guarda en MongoDB
  }

  async remove(id: string) {
    const eliminado = await this.golModel.findByIdAndDelete(id); // Elimina un gol
    if (!eliminado) {
      throw new NotFoundException(`Gol con id ${id} no encontrado`);
    }
    return eliminado;
  }
}
