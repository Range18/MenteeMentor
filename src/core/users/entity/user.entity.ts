import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from '../../session/entity/session.entity';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { VerificationCode } from '#src/core/verification-codes/entities/verification-code.entity';

@Entity('users')
export class UserEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @OneToOne(() => VerificationCode, (code) => code.user, { nullable: true })
  code?: VerificationCode;

  @OneToMany(() => SessionEntity, (session) => session.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  sessions?: SessionEntity[];
}
