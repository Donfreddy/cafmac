import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) {
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k));
    return this;
  }

  public getPort() {
    return this.getValue('APP_PORT');
  }

  public getJWT() {
    return {
      secretKey: this.getValue('APP_PORT', false) || 'xxxxxx',
      expiresIn: this.getValue('APP_PORT', false) || '1d',
    };
  }

  public isProduction() {
    const mode = this.getValue('APP_MODE', false);
    return mode != 'dev';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // entities: ['**/*.entity{.ts,.js}'],

      // migrationsTableName: 'migration',
      // migrations: ['src/migration/*.ts'],
      // ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
  ]);

export { configService };