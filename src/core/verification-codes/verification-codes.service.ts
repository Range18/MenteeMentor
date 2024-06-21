import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { VerificationCode } from '#src/core/verification-codes/entities/verification-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import CodeExceptions = AllExceptions.CodeExceptions;

@Injectable()
export class VerificationCodesService extends BaseEntityService<
  VerificationCode,
  'CodeExceptions'
> {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
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
    });

    if (!codeEntity) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'CodeExceptions',
        CodeExceptions.InvalidCode,
      );
    }

    await this.removeOne(codeEntity);

    return { success: true };
  }
}
