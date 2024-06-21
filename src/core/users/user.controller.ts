import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiTags } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { UpdateUserDto } from '#src/core/users/dto/update-user.dto';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<GetUserRdo[]> {
    return this.userService.formatToRdo(await this.userService.find({}));
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<GetUserRdo> {
    return this.userService.formatToRdo(
      await this.userService.findOne({ where: { id } }, true),
    );
  }

  @AuthGuard()
  @Get('me')
  async getUserMe(@User() user: UserRequest): Promise<GetUserRdo> {
    return this.userService.formatToRdo(
      (await this.userService.findOne({ where: { id: user.id } }))!,
    );
  }

  @AuthGuard()
  @Patch('/me')
  async updateSelf(
    @User() user: UserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserRdo> {
    await this.userService.updateOne({ where: { id: user.id } }, updateUserDto);

    return this.userService.formatToRdo(
      await this.userService.findOne({ where: { id: user.id } }),
    );
  }
}
