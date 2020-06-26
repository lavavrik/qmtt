import { CriteriaType, CriteriaInputs } from './Criterias';

export type Condition = {
  key: ConditionKey;
  title: string;
  type: CriteriaType;
  prefix?: string;
  values: (string | CriteriaInputs)[];
  placeholderDisplay?: (placholderValue: string) => string;
};

export type ConditionKey = 'equals' | 'contains' | 'startsWith' | 'inList' | 'between' | 'greaterThan' | 'lessThan' | string;

const Conditions: {
  [key in CriteriaType]: Condition[];
} = {
  string: [
    {
      key: 'equals',
      title: 'equals',
      type: 'string',
      values: ['to', CriteriaInputs.TextInput],
    },
    {
      key: 'contains',
      title: 'contains',
      type: 'string',
      values: [CriteriaInputs.TextInput],
    },
    {
      key: 'startsWith',
      title: 'starts with',
      type: 'string',
      values: [CriteriaInputs.TextInput],
    },
    {
      key: 'inList',
      title: 'in list',
      type: 'string',
      values: [CriteriaInputs.TextInput],
      placeholderDisplay: (placeholder) => new Array(3).fill(placeholder).join(','),
    },
  ],
  number: [
    {
      key: 'equals',
      title: 'equals',
      type: 'number',
      values: ['to', CriteriaInputs.NumberInput],
    },
    {
      key: 'between',
      title: 'between',
      type: 'number',
      prefix: 'is',
      values: [CriteriaInputs.NumberInput, 'and', CriteriaInputs.NumberInput],
    },
    {
      key: 'greaterThan',
      title: 'greater than',
      type: 'number',
      values: [CriteriaInputs.NumberInput],
    },
    {
      key: 'lessThan',
      title: 'less than',
      type: 'number',
      values: [CriteriaInputs.NumberInput],
    },
    {
      key: 'inList',
      title: 'in list',
      type: 'number',
      values: [CriteriaInputs.TextInput],
      placeholderDisplay: (placeholder) => new Array(3).fill(placeholder).join(','),
    },
  ],
};

export { Conditions };
