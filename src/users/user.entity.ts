import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  teamName: string;

  @Column({ nullable: true })
  coachName: string;

  @Column({ default: 0 })
  playersCount: number;

  @Column()  // Si quieres usar username
  username: string;

  @Column()  // Aquí defines password como columna normal, tipo string
  password: string;
}
