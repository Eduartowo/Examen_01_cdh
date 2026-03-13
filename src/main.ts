import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para que el frontend no tenga broncas
  app.enableCors();

  // Escuchar en el puerto asignado por Render o el 3000 por defecto local
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
