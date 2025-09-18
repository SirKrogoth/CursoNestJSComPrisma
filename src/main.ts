import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';


//Arquivo que inicia a aplicação NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
