import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Book } from '../../books/entities/book.entities';
import { Borrow } from 'src/borrow/entities/borrow.entities';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ADMIN })
  role: UserRole;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  borrows: Borrow[];
}
