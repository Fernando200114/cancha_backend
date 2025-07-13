// src/equipos/equipos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; // Permite usar modelo con Mongo
import { Model } from 'mongoose';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectModel('Equipo') private readonly equipoModel: Model<any> // Inyecta el modelo de equipo
  ) {}

  async findAll() {
    return this.equipoModel.find().exec(); // Devuelve todos los equipos
  }

  async findOne(id: string) {
    const equipo = await this.equipoModel.findById(id).exec(); // Busca equipo por ID
    if (!equipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`); // Si no existe, lanza error
    }
    return equipo;
  }

  async create(createEquipoDto: CreateEquipoDto) {
    const nuevo = new this.equipoModel(createEquipoDto); // Crea nuevo documento
    return nuevo.save(); // Guarda en Mongo
  }

  async update(id: string, updateEquipoDto: CreateEquipoDto) {
    const actualizado = await this.equipoModel.findByIdAndUpdate(id, updateEquipoDto, { new: true }); // Actualiza y retorna el nuevo
    if (!actualizado) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.equipoModel.findByIdAndDelete(id); // Elimina el documento
    if (!eliminado) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return eliminado;
  }
}
