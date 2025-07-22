// // 


// // src/equipos/equipos.controller.ts

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
//   UploadedFile,
//   UseInterceptors,
//   Req,
//   NotFoundException,
//   UseGuards,
// } from '@nestjs/common';
// import { EquiposService } from './equipos.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { Request } from 'express';
// import { UpdateEquipoDto } from './dto/update-equipo.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { Roles } from 'src/auth/guards/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

// const generarNombreImagen = (originalName: string) => {
//   const ext = extname(originalName);
//   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//   return `escudo-${uniqueSuffix}${ext}`;
// };

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Controller('equipos')
// export class EquiposController {
//   constructor(private readonly equiposService: EquiposService) { }

//   @Get()
//   @UseGuards(JwtAuthGuard)
//   findAll() {
//     return this.equiposService.findAll();
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard)
//   findOne(@Param('id') id: string) {
//     return this.equiposService.findOne(id);
//   }

//   @Post()
//   @Roles('admin')

//   @UseInterceptors(
//     FileInterceptor('escudo', {
//       storage: diskStorage({
//         destination: './imagenes',
//         filename: (_, file, cb) => cb(null, generarNombreImagen(file.originalname)),
//       }),
//       limits: { fileSize: 5 * 1024 * 1024 },
//     }),
//   )
//   async create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
//     const body = req.body;

//     const nuevoEquipo = {
//       nombre: body.nombre,
//       ciudad: body.ciudad,
//       entrenador: body.entrenador,
//       puntos: parseInt(body.puntos) || 0,
//       escudoUrl: body.escudoUrl
//     };

//     return this.equiposService.create(nuevoEquipo);
//   }

//   @Put(':id')
//   @Roles('admin')

//   async update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
//     const equipo = await this.equiposService.update(id, dto);
//     if (!equipo) throw new NotFoundException('Equipo no encontrado');
//     return equipo;
//   }

//   @Delete(':id')
//   @Roles('admin')

//   remove(@Param('id') id: string) {
//     return this.equiposService.remove(id);
//   }

//   @Post('upload') // opcional si solo haces esto desde /equipos POST
//   @Roles('admin')
//   @UseInterceptors(
//     FileInterceptor('escudo', {
//       storage: diskStorage({
//         destination: './imagenes',
//         filename: (_, file, cb) => cb(null, generarNombreImagen(file.originalname)),
//       }),
//     }),
//   )
//   uploadFile(@UploadedFile() file: Express.Multer.File) {
//     if (!file) {
//       throw new Error('Archivo no recibido');
//     }

//     return {
//       url: `https://nestjs-cancha-backend-api.desarrollo-software.xyz/imagenes/${file.filename}`,
//     };
//   }
// }

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

const generarNombreImagen = (originalName: string) => {
  const ext = extname(originalName);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return `escudo-${uniqueSuffix}${ext}`;
};

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  // GET públicos: sin guards
  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  // POST protegido: requiere jwt y rol admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
      escudoUrl: body.escudoUrl,
    };

    return this.equiposService.create(nuevoEquipo);
  }

  // PUT protegido: requiere jwt y rol admin
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    const equipo = await this.equiposService.update(id, dto);
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  // DELETE protegido: requiere jwt y rol admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(id);
  }

  // POST upload protegido: requiere jwt y rol admin
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
