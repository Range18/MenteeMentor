import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';
import { QuestionEntity } from '#src/core/questions/entities/question.entity';

@Entity('themes')
export class ThemeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => SubjectEntity, (subject) => subject.themes, {
    nullable: false,
  })
  @JoinColumn({ name: 'subject' })
  subject: SubjectEntity;

  @OneToMany(() => QuestionEntity, (question) => question.theme, {
    nullable: true,
  })
  questions?: QuestionEntity[];
}
