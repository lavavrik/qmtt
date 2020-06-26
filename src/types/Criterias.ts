import { ConditionKey } from './Condition';

export type CriteriaType = 'string' | 'number' | string;

const Predicates = {
  userEmail: 'User Email',
  screenWidth: 'Screen Width',
  screenHeight: 'Screen Height',
  numberOfVisits: '# of Visits',
  firstName: 'First Name',
  lastName: 'Last Name',
  pageResponseTime: 'Page Response time (ms)',
  domain: 'Domain',
  pagePath: 'Page Path',
};

export type PredicateKey = keyof typeof Predicates;

export enum CriteriaInputs {
  NumberInput,
  TextInput,
}

export type Criteria = {
  predicate: PredicateKey,
  type: CriteriaType,
  placeholder: string,
};

const Criterias: Criteria[] = [
  {
    predicate: 'userEmail',
    type: 'string',
    placeholder: 'johndoe@example.com',
  },
  {
    predicate: 'screenWidth',
    type: 'number',
    placeholder: '1920',
  },
  {
    predicate: 'screenHeight',
    type: 'number',
    placeholder: '1080',
  },
  {
    predicate: 'numberOfVisits',
    type: 'number',
    placeholder: '200',
  },
  {
    predicate: 'firstName',
    type: 'string',
    placeholder: 'John',
  },
  {
    predicate: 'lastName',
    type: 'string',
    placeholder: 'Doe',
  },
  {
    predicate: 'pageResponseTime',
    type: 'number',
    placeholder: '150',
  },
  {
    predicate: 'domain',
    type: 'string',
    placeholder: 'example.com',
  },
  {
    predicate: 'pagePath',
    type: 'string',
    placeholder: 'https://example.com/tallships',
  },
];

export type CriteriaDTO = {
  predicateKey: PredicateKey,
  conditionKey: ConditionKey,
  values: { [key: number]: string },
}

export { Predicates, Criterias };
