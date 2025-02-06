import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
    cert: fs.readFileSync(process.env.HTTPS_CERT_PATH),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
