import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jugadores')
export class Jugador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  edad: number;

  @Column()
  posicion: string;

  @Column()
  numero: number;
}
