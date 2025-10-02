// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbType = configService.get<string>('DB_TYPE') || 'sqlite';

        const baseConfig: Partial<TypeOrmModuleOptions> = {
          entities: [User,Profile], // <-- registrar la entidad explícitamente
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: configService.get<string>('DB_LOGGING') === 'true',
        };

        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database: configService.get<string>('DB_DATABASE') || './fitness.db',
            ...baseConfig,
          } as TypeOrmModuleOptions;
        } else {
          return {
            type: dbType as 'postgres' | 'mysql' | 'mariadb',
            host: configService.get<string>('DB_HOST') || 'localhost',
            port: parseInt(configService.get<string>('DB_PORT') as string) || 5432,
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            ...baseConfig,
          } as TypeOrmModuleOptions;
        }
      },
    }),
  ],
})
export class DatabaseModule {}
