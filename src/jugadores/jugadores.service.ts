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
    const jugadores = await this.jugadorModel.find().populate({
      path: 'equipoId',
      select: 'nombre -_id'
    });

    return jugadores.map(jugador => ({
      _id: jugador._id,
      nombre: jugador.nombre,
      posicion: jugador.posicion,
      equipo: jugador.equipoId?.nombre ?? 'Sin equipo', // ← CAMBIADO
      goles: jugador.goles,
      tarjetasAmarillas: jugador.tarjetasAmarillas,
      tarjetasRojas: jugador.tarjetasRojas,
    }));
  }

  async findOne(id: string) {
    const jugador = await this.jugadorModel.findById(id).populate({
      path: 'equipoId',
      select: 'nombre -_id'
    });
    if (!jugador) throw new NotFoundException(`Jugador con id ${id} no encontrado`);

    return {
      _id: jugador._id,
      nombre: jugador.nombre,
      posicion: jugador.posicion,
      equipo: jugador.equipoId?.nombre ?? 'Sin equipo',
      goles: jugador.goles,
      tarjetasAmarillas: jugador.tarjetasAmarillas,
      tarjetasRojas: jugador.tarjetasRojas,
    };
  }

  async create(createJugadorDto: CreateJugadorDto) {
    const nuevo = new this.jugadorModel(createJugadorDto);
    return nuevo.save();
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
