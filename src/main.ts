// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as crypto from 'crypto';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common'; // ✅ Import necesario

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = crypto as unknown as Crypto;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // ✅ Usar ValidationPipe con transform habilitado
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // 🔥 Esto permite que class-validator convierta strings a number automáticamente
    }),
  );

  // Servir archivos estáticos desde carpeta "imagenes"
  app.use('/imagenes', express.static(join(__dirname, '..', 'imagenes')));

  await app.listen(process.env.PORT ?? 3013);
}
bootstrap();
