import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('retirement_fund_averages', { schema: 'public' })
export class RetirementFundAverage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'degree_id', type: 'bigint' })
  degreeId: number;

  @Column({ name: 'category_id', type: 'bigint' })
  categoryId: number;

  @Column({ 
    name: 'retirement_fund_average', 
    type: 'double precision' 
  })
  retirementFundAverage: number;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;
}