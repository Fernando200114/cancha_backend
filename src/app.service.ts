import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hela bienvenido a canchita! version: 2025.07.12.18.43';
  }
}
