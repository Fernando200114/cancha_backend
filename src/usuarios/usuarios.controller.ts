


import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';  // Asegúrate que la ruta es correcta
import { RolesGuard } from '../auth/guards/roles.guard';      // Asegúrate que la ruta es correcta
import { Roles } from '../auth/guards/roles.decorator';       // Asegúrate que la ruta es correcta

@Controller('usuarios')
// @UseGuards(JwtAuthGuard, RolesGuard) // Aplica ambos guards al controlador completo
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @Roles('admin', 'usuario')  // Permite que ambos roles puedan acceder
  async listar(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Post()
  @Roles('admin')  // Solo admins pueden crear usuarios
  async crear(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.crear(usuarioData);
  }

  //  @Post('crear-admin-temporal')
  // async crearAdminTemporal() {
  //   return this.usuariosService.crearAdmin();
  // }
}
