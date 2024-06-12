import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Filtering {
    property: string;
    rule: string;
    value?: string;
}

// valid filter rules
export enum FilterRule {
    EQUALS = 'eq',
    NOT_EQUALS = 'neq',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUALS = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUALS = 'lte',
    LIKE = 'like',
    NOT_LIKE = 'nlike',
    IN = 'in',
    NOT_IN = 'nin',
    IS_NULL = 'isnull',
    IS_NOT_NULL = 'isnotnull',
}

export const FilteringParams = createParamDecorator((data, ctx: ExecutionContext): Filtering[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filters = req.query.filters as string;
    if (!filters) return null;

    // check if the valid params sent is an array
    if (!Array.isArray(data)) throw new BadRequestException('Invalid filter parameter');

    // split the filter parameter into individual filter criteria
    const filterCriteria = filters.split(',');

    // define the regex pattern for filter criteria
    const filterPattern = /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/;
    const filterPatternNoValue = /^[a-zA-Z0-9_]+:(isnull|isnotnull)$/;

    // initialize an array to hold the validated filtering objects
    const filtering: Filtering[] = [];

    // validate each filter criterion
    for (const criterion of filterCriteria) {
        if (!criterion.match(filterPattern) && !criterion.match(filterPatternNoValue)) {
            throw new BadRequestException('Invalid filter parameter');
        }

        const [property, rule, value] = criterion.split(':');
        if (!data.includes(property)) throw new BadRequestException(`Invalid filter property: ${property}`);
        if (!Object.values(FilterRule).includes(rule as FilterRule)) throw new BadRequestException(`Invalid filter rule: ${rule}`);

        filtering.push({ property, rule, value });
    }

    return filtering;
});
