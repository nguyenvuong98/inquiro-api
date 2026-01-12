import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbModel } from 'src/share/constants';
import { BaseRepository } from 'src/share/base.repository';
import { WorkSpace } from './work-space.schema';

@Injectable()
export class WorkSpaceRepository extends BaseRepository {
  constructor(@InjectModel(WorkSpace.name) model: Model<WorkSpace>) {
    super(model);
  }
}
