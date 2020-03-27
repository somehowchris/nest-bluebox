import {
  DeepPartial,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, IsDateString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  public id?: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  public updatedAt?: Date;

  constructor(input?: DeepPartial<AbstractEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        this[key] = value;
      }
    }
  }
}
