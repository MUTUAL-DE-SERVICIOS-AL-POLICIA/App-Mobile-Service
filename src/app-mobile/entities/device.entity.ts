import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'affiliate_devices' })
export class Device {
  @PrimaryColumn({ name: 'device_id', type: 'varchar', length: 255 })
  deviceId: string;

  @Column({ type: 'bool', default: false })
  enrolled: boolean;

  @Column({ type: 'json', nullable: true })
  livenessActions: Record<string, any>;

  @Column({ type: 'bool', default: false })
  verified: boolean;

  @Column({ name: 'eco_com_procedure_id', type: 'bigint', nullable: true })
  ecoComProcedureId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'affiliate_token_id', type: 'int', nullable: true })
  affiliateTokenId: number;
}
