import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptions,
} from 'typeorm';
import { CustomExceptions } from '#src/common/exception-handler/api-exception';

export interface IBaseEntityService<
  Entity extends object,
  NotFoundException extends keyof CustomExceptions,
  EntityRdo = undefined,
> {
  findOne(
    options: FindOneOptions<Entity>,
    throwError: boolean,
  ): Promise<Entity | null>;

  find(options: FindOptions<Entity>, throwError: boolean): Promise<Entity[]>;

  save(entities: Entity[]): Promise<Entity[]>;

  save(entity: Entity): Promise<Entity>;

  updateOne(
    optionsOrEntity: FindOneOptions<Entity> | Entity,
    toUpdate: DeepPartial<Entity>,
    throwError: boolean,
  ): Promise<Entity>;

  removeOne(
    optionsOrEntity: FindOneOptions<Entity> | Entity,
    throwError: boolean,
  ): Promise<void>;

  remove(
    optionsOrEntities: FindManyOptions<Entity> | Entity[],
    throwError: boolean,
  ): Promise<void>;

  formatToRdo(entities: Entity[]): EntityRdo[];

  formatToRdo(entity: Entity): EntityRdo;
}
