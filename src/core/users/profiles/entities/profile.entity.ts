import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { CustomBaseEntity } from '#src/common/base-entity/base.entity';
import { LanguageEntity } from '#src/core/languages/entities/language.entity';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';

@Entity('profiles')
export class ProfileEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToMany(() => LanguageEntity, (language) => language.profiles, {
    nullable: true,
  })
  languages?: LanguageEntity[];

  @ManyToMany(() => SubjectEntity, (subject) => subject.profiles, {
    nullable: true,
  })
  subjects?: SubjectEntity[];

  @Column({ nullable: true })
  education?: string;

  @Column({ nullable: false, default: 0 })
  answersCount: number;

  @Column({ nullable: false, default: 0 })
  questionsCount: number;

  @Column({ nullable: true })
  answerSpeed?: number;

  // background
}
