// // src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as crypto from 'crypto';
// import * as express from 'express';
// import { join } from 'path';
// import { ValidationPipe } from '@nestjs/common'; // ✅ Import necesario

// if (typeof globalThis.crypto === 'undefined') {
//   globalThis.crypto = crypto as unknown as Crypto;
// }

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();

//   // ✅ Usar ValidationPipe con transform habilitado
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       transform: true, // 🔥 Esto permite que class-validator convierta strings a number automáticamente
//     }),
//   );

//   // Servir archivos estáticos desde carpeta "imagenes"
//   app.use('/imagenes', express.static(join(__dirname, '..', 'imagenes')));

//   await app.listen(process.env.PORT ?? 3013);
// }
// bootstrap();


// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as crypto from 'crypto';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = crypto as unknown as Crypto;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Aumentar tamaño permitido del cuerpo
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // ✅ CORS para frontend local
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // ✅ Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // ✅ Archivos estáticos
  app.use('/imagenes', express.static(join(__dirname, '..', 'imagenes')));

  await app.listen(process.env.PORT ?? 3013);
}
bootstrap();
