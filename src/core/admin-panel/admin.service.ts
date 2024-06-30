import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteSettingsEntity } from '#src/core/admin-panel/entities/site-settings.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(SiteSettingsEntity)
    private readonly siteSettingsRepository: Repository<SiteSettingsEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const settings = await this.findOne();

    if (!settings) {
      await this.siteSettingsRepository.save({
        defaultTickets: 0,
        defaultCoins: 0,
      });

      //TODO use logger
      console.log('Please change default settings in site_settings table');
    } else if (settings.defaultTickets == 0 || settings.defaultCoins == 0) {
      //TODO use logger
      console.log(
        'Please change default settings in site_settings table, because defaultCoins or defaultTickets are 0',
      );
    }
  }

  async findOne(): Promise<SiteSettingsEntity> {
    return (await this.siteSettingsRepository.find({}))[0];
  }

  async setDefaultValuesForUser(user: UserEntity): Promise<UserEntity> {
    const settings = await this.findOne();

    if (!settings) {
      throw new NotFoundException(
        'Admin settings are not found. Please try again.',
      );
    }

    user.coins = settings.defaultCoins;
    user.tickets = settings.defaultTickets;

    return user;
  }
}
