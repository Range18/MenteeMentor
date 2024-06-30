import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSettingsEntity } from '#src/core/admin-panel/entities/site-settings.entity';
import { AdminService } from '#src/core/admin-panel/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSettingsEntity])],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminSettingsModule {}
