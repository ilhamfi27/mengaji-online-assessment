import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm.config';

export class DatabaseProvider {
  static datasource: NonNullable<DataSource>;
  static getDatasource = () => {
    if (!DatabaseProvider.datasource) {
      DatabaseProvider.datasource = new DataSource(dataSourceOptions);
    }
    return DatabaseProvider.datasource;
  };
  static async initialize() {
    const datasource = DatabaseProvider.getDatasource();
    if (!datasource.isInitialized) {
      await DatabaseProvider.getDatasource().initialize();
    }
  }
  static async close() {
    const datasource = DatabaseProvider.getDatasource();
    datasource.manager.connection.destroy();
  }
}

export const OrmConfig = DatabaseProvider.getDatasource();
