import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { VerificationCodeEntity } from '#src/core/verification-codes/entities/verification-code.entity';
import { UserService } from '#src/core/users/user.service';
import CodeExceptions = AllExceptions.CodeExceptions;

@Injectable()
export class VerificationCodesService extends BaseEntityService<
  VerificationCodeEntity,
  'CodeExceptions'
> {
  constructor(
    @InjectRepository(VerificationCodeEntity)
    private readonly verificationCodeRepository: Repository<VerificationCodeEntity>,
    private readonly userService: UserService,
  ) {
    super(
      verificationCodeRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'CodeExceptions',
        CodeExceptions.NotFound,
      ),
    );
  }

  async verify(code: string, userId: number) {
    const codeEntity = await this.findOne({
      where: { user: { id: userId }, code: code },
      relations: { user: true },
    });

    if (!codeEntity) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'CodeExceptions',
        CodeExceptions.InvalidCode,
      );
    }

    codeEntity.user.isVerified = true;
    await this.userService.save(codeEntity.user);

    await this.removeOne(codeEntity);

    return { success: true };
  }
}
