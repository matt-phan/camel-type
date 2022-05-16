import { config } from 'dotenv';

config();

class ConfigService {
  constructor(private env: Record<string, string | undefined>) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }

  public getPort() {
    return parseInt(this.getValue('POSTGRES_PORT', true));
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getClientConfig() {
    return {
      user: this.getValue('POSTGRES_USER'),
      host: this.getValue('POSTGRES_HOST'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      port: this.getPort(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_HOST',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
