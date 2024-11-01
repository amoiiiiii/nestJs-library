import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../user/entities/user.entities';
import { Author } from 'src/author/entities/author.entities';
import { Category } from 'src/categories/entities/category.entities';
import { Book } from 'src/books/entities/book.entity';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    User, // Add the User entity directly
    Author,
    Category,
    Book,
  ],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((error) => {
    console.error('Error connecting database:', error);
  });
