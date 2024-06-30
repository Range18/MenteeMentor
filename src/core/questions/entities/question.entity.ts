import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';
import { ThemeEntity } from '#src/core/subjects/themes/entities/theme.entity';

@Entity('questions')
export class QuestionEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userCreated' })
  userCreated: UserEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject' })
  subject: SubjectEntity;

  @ManyToOne(() => ThemeEntity, (theme) => theme.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'theme' })
  theme: ThemeEntity;

  @Column({ type: 'varchar', nullable: false })
  timeToAnswer: string;

  @Column({ type: 'varchar', nullable: false })
  answerFormat: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false })
  readonly tickets: number;

  @Column({ nullable: false })
  coins: number;

  @Column({ nullable: false, default: false })
  readonly isFirst: boolean;
}
