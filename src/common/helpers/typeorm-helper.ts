import { IsNull, Not, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, ILike, In } from 'typeorm';
import { Sorting } from '../decorators/sorting-params.decorator';
import { FilterRule, Filtering } from '../decorators/filtering-params.decorator';


// Get the order object for multiple sorting criteria
export const getOrder = (sorts: Sorting[]) => {
    if (!sorts || sorts.length === 0) return {};
    return sorts.reduce((acc, sort) => {
        acc[sort.property] = sort.direction;
        return acc;
    }, {});
};

// Get the where object for multiple filtering criteria
export const getWhere = (filters: Filtering[]) => {
    if (!filters || filters.length === 0) return {};
    return filters.reduce((acc, filter) => {
        if (filter.rule == FilterRule.IS_NULL) {
            acc[filter.property] = IsNull();
        } else if (filter.rule == FilterRule.IS_NOT_NULL) {
            acc[filter.property] = Not(IsNull());
        } else if (filter.rule == FilterRule.EQUALS) {
            acc[filter.property] = filter.value;
        } else if (filter.rule == FilterRule.NOT_EQUALS) {
            acc[filter.property] = Not(filter.value);
        } else if (filter.rule == FilterRule.GREATER_THAN) {
            acc[filter.property] = MoreThan(filter.value);
        } else if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS) {
            acc[filter.property] = MoreThanOrEqual(filter.value);
        } else if (filter.rule == FilterRule.LESS_THAN) {
            acc[filter.property] = LessThan(filter.value);
        } else if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS) {
            acc[filter.property] = LessThanOrEqual(filter.value);
        } else if (filter.rule == FilterRule.LIKE) {
            acc[filter.property] = ILike(`%${filter.value}%`);
        } else if (filter.rule == FilterRule.NOT_LIKE) {
            acc[filter.property] = Not(ILike(`%${filter.value}%`));
        } else if (filter.rule == FilterRule.IN) {
            acc[filter.property] = In(filter.value.split(','));
        } else if (filter.rule == FilterRule.NOT_IN) {
            acc[filter.property] = Not(In(filter.value.split(',')));
        }
        return acc;
    }, {});
};
