import { Injectable, NotFoundException } from '@nestjs/common';
import { Unit, UnitDocument } from '../models/unit.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UnitDTO, UnitDesignationDTO } from '../dtos/unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Unit.name)
    private readonly unitModel: Model<UnitDocument>,
  ) {}

  create(unit: UnitDTO) {
    return this.unitModel.create(unit);
  }

  list() {
    return this.unitModel.find().then((records) => ({ records }));
  }

  update(id: string, unit: UnitDTO) {
    return this.unitModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: unit,
        },
        {
          new: true,
        },
      )
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException('Unit not found');
        }
        return updated;
      });
  }

  addDesignation(unit: string, designation: UnitDesignationDTO) {
    return this.unitModel
      .findOneAndUpdate(
        {
          _id: unit,
          'designations.name': { $ne: designation.name },
        },
        {
          $push: {
            designations: designation,
          },
        },
        {
          new: true,
        },
      )
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException(
            'Designation or unit not found, OR designation already exist',
          );
        }
        return updated;
      });
  }

  removeDesignation(unit: string, designation: string) {
    return this.unitModel
      .findOneAndUpdate(
        {
          _id: unit,
        },
        {
          $pull: {
            designations: { name: designation },
          },
        },
        {
          new: true,
        },
      )
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException(
            'Designation or unit not found, OR designation already exist',
          );
        }
        return updated;
      });
  }

  updateDesignation(
    unit: string,
    designationId: string,
    designation: UnitDesignationDTO,
  ) {
    return this.unitModel
      .findOneAndUpdate(
        {
          _id: unit,
          'designations._id': designationId,
        },
        {
          $set: {
            'designations.$': designation,
          },
        },
        {
          new: true,
        },
      )
      .then((updated) => {
        if (!updated) {
          throw new NotFoundException(
            'Designation or unit not found, OR designation already exist',
          );
        }
        return updated;
      });
  }

  getDesignations(search?: string) {
    return this.unitModel
      .aggregate([
        ...(search
          ? [
              {
                $match: {
                  'designations.name': { $regex: search, $options: 'ig' },
                },
              },
            ]
          : []),
        { $unwind: '$designations' },
        { $replaceRoot: { newRoot: '$designations' } },
      ])
      .then((records) => ({ records }));
  }
}
