import { CriteriaDTO, Criterias, Criteria } from '../types/Criterias';

export default function transformCriteriasDTOToSQLStatement(criterias: CriteriaDTO[]): string {
  const columnsQueries = criterias
    // Uncomment this to include only first condition of any given field, omitting the rest
    // (helps avoiding `userEmail` = "test@example.com" AND `userEmail` = "another@exmaple.com")
    // Implementing OR and braces is probably out of the scope of this task...
    // .filter((criteria, i) => i === criterias.findIndex((c) => (c.predicateKey === criteria.predicateKey)))
    .map(({ predicateKey, conditionKey, values }) => {
      let columnQuery = '';

      columnQuery += `\`${predicateKey}\` `;

      const criteria = Criterias.find((c) => c.predicate === predicateKey) as Criteria;

      values = Object.values(values);

      // Escaping of values could be managed somewhere here, but it's probably out of scope as well
      // (and I also hope you do not compose SQL queries in a browser anyway)

      switch (conditionKey) {
        case 'equals':
          if (criteria.type === 'string') {
            columnQuery += `= "${values[0]}"`;
          } else {
            columnQuery += `= ${values[0]}`;
          }
          break;
        case 'contains':
          columnQuery += `LIKE "%${values[0]}%"`;
          break;
        case 'startsWith':
          columnQuery += `LIKE "${values[0]}%"`;
          break;
        case 'inList':
          if (criteria.type === 'string') {
            columnQuery += `IN (${values[0].split(',').map((value) => `"${value.trim()}"`).join(',')})`;
          } else {
            columnQuery += `IN (${values[0].split(',').map((value) => Number(value)).join(',')})`;
          }
          break;
        case 'between':
          columnQuery += `BETWEEN ${values[0] || 0} AND ${values[1] || 0}`;
          break;
        case 'greaterThan':
          columnQuery += `> ${values[0]}`;
          break;
        case 'lessThan':
          columnQuery += `< ${values[0]}`;
          break;
        default:
          columnQuery += 'IS NOT NULL';
      }

      return columnQuery;
    }).join(' AND ');

  return `SELECT * FROM \`sessions\` WHERE ${columnsQueries}`;
}
