import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id?: string
  @Column({ type: 'uuid' })
  userId: string;
  @Column({ type: 'timestamp' })
  createdAt: Date; 
  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  @Column({ type: 'text', default: '' })
  operationType: string;
}
