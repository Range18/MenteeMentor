import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';

@Entity('verification_codes')
export class VerificationCode extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  readonly code: string;

  @OneToOne(() => UserEntity, (user) => user.code, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
