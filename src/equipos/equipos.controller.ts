// 


// src/equipos/equipos.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

const generarNombreImagen = (originalName: string) => {
  const ext = extname(originalName);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return `escudo-${uniqueSuffix}${ext}`;
};

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) { }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('escudo', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (_, file, cb) => cb(null, generarNombreImagen(file.originalname)),
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const body = req.body;

    const nuevoEquipo = {
      nombre: body.nombre,
      ciudad: body.ciudad,
      entrenador: body.entrenador,
      puntos: parseInt(body.puntos) || 0,
      escudoUrl: file
        ? `https://nestjs-cancha-backend-api.desarrollo-software.xyz/imagenes/${file.filename}`
        : '',
    };

    return this.equiposService.create(nuevoEquipo);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    const equipo = await this.equiposService.update(id, dto);
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }

  @Post('upload') // opcional si solo haces esto desde /equipos POST
  @UseInterceptors(
    FileInterceptor('escudo', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (_, file, cb) => cb(null, generarNombreImagen(file.originalname)),
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Archivo no recibido');
    }

    return {
      url: `https://nestjs-cancha-backend-api.desarrollo-software.xyz/imagenes/${file.filename}`,
    };
  }
}
