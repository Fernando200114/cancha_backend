import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;  // Ejemplo: tipo de cancha (futbol 5, futbol 7, futbol 11)

  @Column({ nullable: true })
  description?: string;  // Descripción del tipo de cancha

  @Column({ nullable: true })
  maxPlayers?: number;  // Máximo número de jugadores permitidos
}
