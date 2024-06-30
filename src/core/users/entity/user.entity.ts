import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from '../../session/entity/session.entity';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { VerificationCodeEntity } from '#src/core/verification-codes/entities/verification-code.entity';
import { ProfileEntity } from '#src/core/users/profiles/entities/profile.entity';
import { Exclude } from 'class-transformer';
import { QuestionEntity } from '#src/core/questions/entities/question.entity';

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

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({ nullable: false, default: 0 })
  coins: number;

  @Column({ nullable: false, default: 0 })
  tickets: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  profile: ProfileEntity;

  @OneToMany(() => QuestionEntity, (question) => question.userCreated, {
    nullable: true,
  })
  questions?: QuestionEntity[];

  @OneToOne(() => VerificationCodeEntity, (code) => code.user, {
    nullable: true,
  })
  code?: VerificationCodeEntity;

  @OneToMany(() => SessionEntity, (session) => session.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  sessions?: SessionEntity[];
}
