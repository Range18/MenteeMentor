import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { In } from 'typeorm';
import { LanguagesService } from '#src/core/languages/languages.service';
import { SubjectsService } from '#src/core/subjects/subjects.service';
import { ProfileRdo } from '#src/core/users/profiles/rdo/profile.rdo';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import ProfileExceptions = AllExceptions.ProfileExceptions;

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly languagesService: LanguagesService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @AuthGuard()
  @Post()
  async create(
    @User() user: UserRequest,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileRdo> {
    await this.profilesService.save({
      education: createProfileDto.education,
      languages: await this.languagesService.find({
        where: { id: In(createProfileDto.languageIds) },
      }),
      subjects: await this.subjectsService.find({
        where: { id: In(createProfileDto.subjectIds) },
      }),
      user: { id: user.id },
    });

    return this.profilesService.formatToRdo(
      await this.profilesService.findOne({
        where: { user: { id: user.id } },
        relations: { user: true, subjects: true, languages: true },
      }),
    );
  }

  @Get()
  async findAll(): Promise<ProfileRdo[]> {
    return this.profilesService.formatToRdo(
      await this.profilesService.find({}),
    );
  }

  @AuthGuard()
  @Get('my')
  async findMy(@User() user: UserRequest): Promise<ProfileRdo> {
    return this.profilesService.formatToRdo(
      await this.profilesService.findOne({
        where: { user: { id: user.id } },
      }),
    );
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<ProfileRdo> {
    return this.profilesService.formatToRdo(
      await this.profilesService.findOne({ where: { user: { id: userId } } }),
    );
  }

  //TODO check
  @AuthGuard()
  @Patch('my')
  async update(
    @User() user: UserRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileRdo> {
    const profile = await this.profilesService.findOne({
      where: { user: { id: user.id } },
      relations: { languages: true, subjects: true },
    });

    if (!profile) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'ProfileExceptions',
        ProfileExceptions.NotFound,
      );
    }

    profile.languages = [];
    profile.subjects = [];

    await this.profilesService.save(profile);

    const subjects = await this.subjectsService.find({
      where: { id: In(updateProfileDto.subjectIds) },
    });

    const languages = await this.languagesService.find({
      where: { id: In(updateProfileDto.languageIds) },
    });

    return this.profilesService.formatToRdo(
      await this.profilesService.updateOne(profile, {
        education: updateProfileDto.education,
        languages: languages,
        subjects: subjects,
      }),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.profilesService.removeOne({ where: { id: id } });
  }
}
