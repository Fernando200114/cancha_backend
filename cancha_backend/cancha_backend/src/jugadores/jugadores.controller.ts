import { Controller, Post, Body, Get } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';

@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Post()
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadoresService.create(createJugadorDto);
  }

  @Get()
  findAll() {
    return this.jugadoresService.findAll();
  }
  // ñ

}
