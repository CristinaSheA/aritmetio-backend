import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id?: string
  @Column({ type: 'uuid' })
  userId: string;
  @Column({ type: 'timestamp' })
  createdAt: Date; 
}
