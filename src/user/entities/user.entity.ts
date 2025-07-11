import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{ unique: true, nullable: false })
  username: string;

  @Column('text',{ nullable: false })
  password: string;

  @Column({ default: 10 })
  exercisesPerGame: number;
}
