import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) { }

  async crear(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepo.create(usuarioData);
    return this.usuarioRepo.save(nuevoUsuario);
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { correo } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  async crearAdmin() {
    const existe = await this.buscarPorCorreo('fernando@tuapp.com');
    if (!existe) {
      const passwordHash = await bcrypt.hash('ferr123', 10);
      const nuevoAdmin = this.usuarioRepo.create({
        nombre: 'Fernando',
        correo: 'fernando@tuapp.com',
        password: passwordHash,
        rol: 'admin',
        activo: true,
      });
      await this.usuarioRepo.save(nuevoAdmin);
      console.log('Usuario admin creado');
    }
  }

}
