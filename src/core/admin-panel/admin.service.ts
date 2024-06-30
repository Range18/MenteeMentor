import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteSettingsEntity } from '#src/core/admin-panel/entities/site-settings.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(SiteSettingsEntity)
    private readonly siteSettingsRepository: Repository<SiteSettingsEntity>,
  ) {}

  async findOne(): Promise<SiteSettingsEntity> {
    return await this.siteSettingsRepository.findOne({});
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
