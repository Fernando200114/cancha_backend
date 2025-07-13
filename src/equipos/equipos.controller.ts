// src/equipos/equipos.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Controller('equipos') // Ruta base: /equipos
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {} // Inyecta el servicio

  @Get()
  findAll() {
    return this.equiposService.findAll(); // Devuelve todos los equipos
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id); // Devuelve un equipo por ID
  }

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto); // Crea un equipo nuevo
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: CreateEquipoDto) {
    return this.equiposService.update(id, updateEquipoDto); // Actualiza equipo
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id); // Elimina equipo
  }
}
