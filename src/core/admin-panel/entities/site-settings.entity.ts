import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('site_settings')
export class SiteSettingsEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, default: 0 })
  defaultTickets: number;

  @Column({ nullable: false, default: 0 })
  defaultCoins: number;
}
