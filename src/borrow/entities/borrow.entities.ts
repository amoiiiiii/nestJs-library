import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entities';
import { Book } from '../../books/entities/book.entities';

@Entity('borrows')
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  bookId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate?: Date;

  @ManyToOne(() => User, (user) => user.borrows, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Book, (book) => book.borrows, {
    onDelete: 'CASCADE',
  })
  book: Book;
}
