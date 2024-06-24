import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '#src/core/users/profiles/entities/profile.entity';

@Entity('languages')
export class LanguageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => ProfileEntity, (profile) => profile.languages, {
    nullable: true,
  })
  @JoinTable({
    name: 'languages_to_profiles',
    joinColumn: { name: 'language', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profile', referencedColumnName: 'id' },
  })
  profiles?: ProfileEntity[];
}
