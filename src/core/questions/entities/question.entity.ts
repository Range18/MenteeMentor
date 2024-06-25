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
import { type AnswerFormatType } from '#src/core/questions/types/answer-format.type';
import { type TimeToAnswerType } from '#src/core/questions/types/time-to-answer.type';

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

  // tag

  @Column({ type: 'varchar', nullable: false })
  timeToAnswer: TimeToAnswerType;

  @Column({ type: 'varchar', nullable: false })
  answerFormat: AnswerFormatType;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false })
  tickets: number;

  @Column({ nullable: false })
  coins: number;

  @Column({ nullable: false, default: false })
  isFirst: boolean;
}
