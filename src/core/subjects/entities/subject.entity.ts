import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '#src/core/users/profiles/entities/profile.entity';

@Entity('subjects')
export class SubjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => ProfileEntity, (profile) => profile.subjects, {
    nullable: true,
  })
  @JoinTable({
    name: 'subjects_to_profiles',
    joinColumn: { name: 'subject', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profile', referencedColumnName: 'id' },
  })
  profiles?: ProfileEntity[];
}
