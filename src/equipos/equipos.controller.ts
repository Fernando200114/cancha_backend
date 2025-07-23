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
  UseGuards,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Función para generar nombre único para la imagen
const generarNombreImagen = (originalName: string) => {
  const ext = extname(originalName);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return `escudo-${uniqueSuffix}${ext}`;
};

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) { }

  // Rutas públicas
  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  // Rutas protegidas solo para admin con token
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('escudo', {
      storage: diskStorage({
        destination: './public/imagenes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // límite 5MB
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
        ? `${file.filename}`
        : '',
    };
    return this.equiposService.create(nuevoEquipo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('escudo', {
      storage: diskStorage({
        destination: './public/imagenes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    const body = req.body;

    const updateData: any = {
      nombre: body.nombre,
      ciudad: body.ciudad,
      entrenador: body.entrenador,
      puntos: parseInt(body.puntos) || 0,
    };

    if (file) {
      updateData.escudoUrl = `${file.filename}`;
    }

    const equipoActualizado = await this.equiposService.update(id, updateData);
    if (!equipoActualizado) {
      throw new NotFoundException('Equipo no encontrado');
    }

    return equipoActualizado;
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }

  // Ruta para subir solo la imagen de escudo (opcional)
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('escudo', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (_, file, cb) => {
          const filename = generarNombreImagen(file.originalname);
          cb(null, filename);
        },
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
