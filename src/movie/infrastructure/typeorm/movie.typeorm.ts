
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class MovieTypeorm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column({ nullable: true})
  studios: string;

  @Column({ nullable: true})
  producers: string;

  @Column()
  winner: string;
}
