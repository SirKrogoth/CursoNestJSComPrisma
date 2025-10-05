import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';


//Arquivo que inicia a aplicação NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //se TRUE ele remove as chaves que não estão no DTO
    transform: false, //converte o tipo primitivo para o tipo esperado no DTO
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
