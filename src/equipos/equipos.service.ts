// src/equipos/equipos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectModel('Equipo') private readonly equipoModel: Model<any>,
  ) {}

  async findAll() {
    const equipos = await this.equipoModel.find().exec();
    return equipos.map(equipo => ({
      id: equipo._id.toString(),
      nombre: equipo.nombre,
      ciudad: equipo.ciudad,
      entrenador: equipo.entrenador,
      escudoUrl: equipo.escudoUrl,
      puntos: equipo.puntos,
    }));
  }

  async findOne(id: string) {
    const equipo = await this.equipoModel.findById(id).exec();
    if (!equipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return {
      id: equipo._id.toString(),
      nombre: equipo.nombre,
      ciudad: equipo.ciudad,
      entrenador: equipo.entrenador,
      escudoUrl: equipo.escudoUrl,
      puntos: equipo.puntos,
    };
  }

  async create(createEquipoDto: CreateEquipoDto) {
    const nuevo = new this.equipoModel(createEquipoDto);
    return nuevo.save();
  }

  async update(id: string, updateEquipoDto: CreateEquipoDto) {
    const actualizado = await this.equipoModel.findByIdAndUpdate(id, updateEquipoDto, { new: true });
    if (!actualizado) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.equipoModel.findByIdAndDelete(id);
    if (!eliminado) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }
    return eliminado;
  }
}
