import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'affiliate_tokens' })
export class Token {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'affiliate_id' })
  affiliateId: number;

  @Column({ type: 'varchar', length: 255, name: 'api_token', nullable: true })
  apiToken?: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'firebase_token',
    nullable: true,
  })
  firebaseToken?: string;

  @Column({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt?: Date;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt?: Date;
}
