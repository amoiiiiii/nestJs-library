import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from '../../author/entities/author.entities';
import { Category } from '../../categories/entities/category.entities';
import { User } from '../../user/entities/user.entities';
import { Borrow } from 'src/borrow/entities/borrow.entities';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  authorId: string;

  @Column()
  categoryId: string;

  @Column({ default: 0 })
  qty: number;

  @Column({ nullable: true })
  createdBy?: string;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'CASCADE',
  })
  author: Author;

  @ManyToOne(() => Category, (category) => category.books, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.books, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
