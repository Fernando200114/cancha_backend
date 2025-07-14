// src/partidos/partidos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartidoDto } from './dto/create-partido.dto';

@Injectable()
export class PartidosService {
  constructor(
    @InjectModel('Partido') private readonly partidoModel: Model<any>,
    @InjectModel('Equipo') private readonly equipoModel: Model<any>, // ✅ necesario para obtener los nombres
  ) {}

  // ✅ Obtener todos los partidos con nombres de equipos
  async findAll() {
    const partidos = await this.partidoModel.find().lean();
    const equipos = await this.equipoModel.find().lean();
const equiposMap = new Map(
  equipos.map((e: any) => [e._id.toString(), e.nombre])
);

    return partidos.map((partido) => ({
      ...partido,
      equipoLocalNombre: equiposMap.get(partido.equipoLocalId) || 'Desconocido',
      equipoVisitanteNombre: equiposMap.get(partido.equipoVisitanteId) || 'Desconocido',
    }));
  }

  async findOne(id: string) {
    const partido = await this.partidoModel.findById(id).exec();
    if (!partido) throw new NotFoundException(`Partido con id ${id} no encontrado`);
    return partido;
  }

  async create(createPartidoDto: CreatePartidoDto) {
    const partido = new this.partidoModel(createPartidoDto);
    return partido.save();
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
