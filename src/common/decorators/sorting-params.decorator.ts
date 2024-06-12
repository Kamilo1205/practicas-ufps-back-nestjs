import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  property: string;
  direction: string;
}

export const SortingParams = createParamDecorator((validParams, ctx: ExecutionContext): Sorting[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    // check if the valid params sent is an array
    if (typeof sort !== 'string' && !Array.isArray(sort)) {
      throw new BadRequestException('Invalid sort parameter');
    }

    // Ensure we work with a single string value
    const sortString = Array.isArray(sort) ? sort.join(',') : sort;
    
    // Check if the validParams sent is an array
    if (!Array.isArray(validParams)) {
      throw new BadRequestException('Invalid sort parameter');
    }
  
    // Split the sort parameter into individual sorting criteria
    const sortCriteria = sortString.split(',');

    // define the regex pattern for sorting criteria
    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;

    // initialize an array to hold the validated sorting objects
    const sorting: Sorting[] = [];

    // validate each sorting criterion
    for (const criterion of sortCriteria) {
      if (!criterion.match(sortPattern))
        throw new BadRequestException('Invalid sort parameter');

      const [property, direction] = criterion.split(':');
      if (!validParams.includes(property))
        throw new BadRequestException(`Invalid sort property: ${property}`);

      sorting.push({ property, direction });
    }

    return sorting;
  },
);
