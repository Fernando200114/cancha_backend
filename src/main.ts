// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as crypto from 'crypto';
import * as express from 'express';
import { join } from 'path';

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = crypto as unknown as Crypto;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Servir archivos estáticos desde carpeta "imagenes"
  app.use('/imagenes', express.static(join(__dirname, '..', 'imagenes')));

  await app.listen(process.env.PORT ?? 3013);
}
bootstrap();
