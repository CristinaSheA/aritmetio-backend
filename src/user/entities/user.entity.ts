import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{ unique: true, nullable: true })
  username: string;

  @Column('text',{ nullable: true })
  password: string;

  @Column('text',{ nullable: true, unique: true },)
  email: string;

  @Column({ default: 10 })
  exercisesPerGame: number;
}
