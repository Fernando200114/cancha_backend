// src/equipos/equipos.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: CreateEquipoDto) {
    return this.equiposService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }

  // NUEVO endpoint para subir imágenes
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('escudo', {
      storage: diskStorage({
        destination: './imagenes', // Carpeta local donde guardar imágenes
        filename: (req, file, cb) => {
          // Crear nombre único para evitar sobreescrituras
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `escudo-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Aceptar solo imágenes
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Solo se permiten imágenes'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // Limite 5MB
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Retorna la URL para que el frontend la guarde en escudoUrl
    if (!file) {
      throw new Error('Archivo no recibido');
    }
    return {
      url: `/imagenes/${file.filename}`, // URL para acceder a la imagen
    };
  }
}
