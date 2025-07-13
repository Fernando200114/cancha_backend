// src/goles/goles.controller.ts

import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { GolesService } from './goles.service';
import { CreateGolDto } from './dto/create-gol.dto';

@Controller('goles') // Ruta base: /goles
export class GolesController {
  constructor(private readonly golesService: GolesService) {} // Inyecta el servicio

  @Get()
  findAll() {
    return this.golesService.findAll(); // GET /goles → todos los goles
  }

  @Get('partido/:partidoId')
  findByPartido(@Param('partidoId') partidoId: string) {
    return this.golesService.findByPartido(partidoId); // Goles por partido
  }

  @Post()
  create(@Body() createGolDto: CreateGolDto) {
    return this.golesService.create(createGolDto); // Registrar un nuevo gol
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.golesService.remove(id); // Eliminar un gol por ID
  }
}
