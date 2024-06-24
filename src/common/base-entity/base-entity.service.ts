import { Type } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import deepEqual from 'deep-equal';
import { IBaseEntityService } from '#src/common/base-entity/base-entity-service.interface';
import {
  ApiException,
  CustomExceptions,
} from '#src/common/exception-handler/api-exception';
import { plainToInstance } from 'class-transformer';

type ExtractTypeOrNever<T, K> = T extends undefined ? never : K;

export abstract class BaseEntityService<
  Entity extends object,
  NotFoundException extends keyof CustomExceptions,
  EntityRdo = undefined,
> implements IBaseEntityService<Entity, NotFoundException, EntityRdo>
{
  protected constructor(
    entityRepository: Repository<Entity>,
    notFoundException: ApiException<NotFoundException>,
  );
  protected constructor(
    entityRepository: Repository<Entity>,
    notFoundException: ApiException<NotFoundException>,
    entityDto: ExtractTypeOrNever<EntityRdo, Type<EntityRdo>>,
  );
  protected constructor(
    private readonly entityRepository: Repository<Entity>,
    private readonly notFoundException: ApiException<NotFoundException>,
    private readonly entityDto: ExtractTypeOrNever<
      EntityRdo,
      Type<EntityRdo>
    > = undefined,
  ) {}

  async find(
    options: FindManyOptions<Entity>,
    throwError = false,
  ): Promise<Entity[]> {
    if (options.where && deepEqual(options.where, {})) {
      throw new Error('Properties in the options.where must be defined');
    }

    const entities: Entity[] = await this.entityRepository.find(options);

    if (!entities && throwError) {
      throw this.notFoundException;
    }

    return entities;
  }

  async findOne(
    options: FindOneOptions<Entity>,
    throwError = false,
  ): Promise<Entity | null> {
    if (options.where && deepEqual(options.where, {})) {
      throw new Error('Properties in the options.where must be defined');
    }

    const entity: Entity | null = await this.entityRepository.findOne(options);

    if (!entity && throwError) {
      throw this.notFoundException;
    }

    return entity;
  }

  async save(entity: DeepPartial<Entity>): Promise<Entity>;
  async save(entities: Entity[]): Promise<Entity[]>;
  async save(
    entities: DeepPartial<Entity> | Entity[],
  ): Promise<Entity | Entity[]> {
    if (Array.isArray(entities)) {
      //@ts-ignore
      return this.entityRepository.save(entities);
    } else {
      return this.entityRepository.save(entities);
    }
  }

  async remove(
    optionsOrEntities: FindManyOptions<Entity> | Entity[],
    throwError = true,
  ): Promise<void> {
    const entities: Entity[] =
      'where' in <object>optionsOrEntities
        ? await this.entityRepository.find(
            optionsOrEntities as FindManyOptions<Entity>,
          )
        : (optionsOrEntities as Entity[]);

    if (!entities && throwError) {
      throw this.notFoundException;
    }

    await this.entityRepository.remove(entities);
  }

  async removeOne(
    optionsOrEntity: FindOneOptions<Entity> | Entity,
  ): Promise<void> {
    const entity: Entity | null =
      'where' in <object>optionsOrEntity
        ? await this.entityRepository.findOne(optionsOrEntity)
        : (optionsOrEntity as Entity);

    if (!entity) {
      throw this.notFoundException;
    }

    await this.entityRepository.remove(entity);
  }

  async updateOne(
    optionsOrEntity: FindOneOptions<Entity> | Entity,
    toUpdate: DeepPartial<Entity>,
  ): Promise<Entity> {
    const entity: Entity | null =
      'where' in <object>optionsOrEntity
        ? await this.entityRepository.findOne(optionsOrEntity)
        : (optionsOrEntity as Entity);

    if (!entity) {
      throw this.notFoundException;
    }

    this.entityRepository.merge(entity, toUpdate);

    return this.entityRepository.save(entity);
  }

  formatToRdo(entities: Entity[]): EntityRdo[];
  formatToRdo(entity: Entity): EntityRdo;
  formatToRdo(entity: Entity | Entity[]): EntityRdo | EntityRdo[] {
    return plainToInstance(this.entityDto, entity);
  }
}
