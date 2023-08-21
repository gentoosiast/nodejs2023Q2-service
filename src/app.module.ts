import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '@auth/auth.guard';
import { LoggerMiddleware } from '@core/middlewares/logger/logger.middleware';
import { LoggingInterceptor } from '@core/interceptors/logging/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    SharedModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
