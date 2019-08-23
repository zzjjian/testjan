import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const Config = require('./config/config');
import { SwaggerUtils } from './common/swagger.utils';
import { ConfigCenterUtils } from './common/configcenter.utils';
import { LoggerUtils } from './common/logger.utils';

async function bootstrap() {
  LoggerUtils.setPath('./logs');

  process.on('uncaughtException', function (e) {
    LoggerUtils.error('uncaughtException');
    LoggerUtils.error(e);
  });

  //config center
  //ConfigCenterUtils.monitor(Config);
  LoggerUtils.info(Config);

  //
  const app = await NestFactory.create(AppModule, {cors: true});
  //swagger
  const options = new DocumentBuilder()
    .setTitle(Config.api_info.title)
    .setDescription(Config.api_info.description)
    .setVersion(Config.api_info.title + '.' + Config.api_info.version)
    .setHost(Config.api_info.title + '.' + Config.api_info.tenant)
    .addTag('basic')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerUtils.swaggerDocument = document;
  //start
  await app.listen(Config.port);
}
bootstrap();
