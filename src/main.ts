import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Configurar la carpeta de archivos estaticos
  app.useStaticAssets(join(__dirname, '..','html'));
  await app.listen(3000);
}
bootstrap();
