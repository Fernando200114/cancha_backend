import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jugador } from './jugador.entity';
import { CreateJugadorDto } from './dto/create-jugador.dto';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>,
  ) {}

  create(createJugadorDto: CreateJugadorDto) {
    const jugador = this.jugadorRepository.create(createJugadorDto);
    return this.jugadorRepository.save(jugador);
  }

  findAll() {
    return this.jugadorRepository.find();
  }
}

