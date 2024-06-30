import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { UserService } from '#src/core/users/user.service';
import { IsVerifiedGuard } from '#src/common/decorators/guards/is-verified-guard.decorator';
import { QuestionRdo } from '#src/core/questions/rdo/question.rdo';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly userService: UserService,
  ) {}

  @IsVerifiedGuard()
  @AuthGuard()
  @Post()
  async create(
    @User() user: UserRequest,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionRdo> {
    console.log(user.id);
    const userCreated = await this.userService.findOne({
      where: { id: user.id },
      relations: { questions: true },
    });

    const isFirst = userCreated.questions.length == 0;

    userCreated.tickets -= createQuestionDto.tickets;
    userCreated.coins -= createQuestionDto.coins;

    await this.userService.save(userCreated);

    const { id } = await this.questionsService.save({
      ...createQuestionDto,
      userCreated: userCreated,
      isFirst: isFirst,
      subject: { id: createQuestionDto.subjectId },
      theme: { id: createQuestionDto.themeId },
    });

    return this.questionsService.formatToRdo(
      await this.questionsService.findOne({
        where: { id },
        relations: { userCreated: true, theme: true, subject: true },
      }),
    );
  }

  @Get()
  async findAll(): Promise<QuestionRdo[]> {
    return this.questionsService.formatToRdo(
      await this.questionsService.find({
        relations: {
          userCreated: true,
          theme: true,
          subject: true,
        },
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuestionRdo> {
    return this.questionsService.formatToRdo(
      await this.questionsService.findOne({
        where: { id },
        relations: { userCreated: true, theme: true, subject: true },
      }),
    );
  }

  @IsVerifiedGuard()
  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionRdo> {
    await this.questionsService.updateOne(
      { where: { id } },
      {
        ...updateQuestionDto,
        subject: { id: updateQuestionDto.subjectId },
        theme: { id: updateQuestionDto.themeId },
      },
    );

    return this.questionsService.formatToRdo(
      await this.questionsService.findOne({
        where: { id },
        relations: { userCreated: true, theme: true, subject: true },
      }),
    );
  }
}
