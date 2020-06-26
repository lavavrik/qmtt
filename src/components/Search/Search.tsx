import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../form/Button/Button';
import Criteria from '../Criteria/Criteria';
import { Criterias, CriteriaDTO } from '../../types/Criterias';
import { Conditions } from '../../types/Condition';
import * as styles from './styles.sass';
import QueryDisplay from '../QueryDisplay/QueryDisplay';
import transformCriteriasDTOToSQLStatement from '../../transformers/transformCriteriasDTOToSQLStatement';

const defaultCriteriaViewModel: CriteriaDTO = {
  predicateKey: Criterias[0].predicate,
  conditionKey: Conditions[Criterias[0].type][0].key,
  values: {},
};

export default function Search() {
  const [criterias, setCriterias] = useState<CriteriaDTO[]>([defaultCriteriaViewModel]);

  const [sqlQuery, setSQLQuery] = useState('');
  const resetSQLQuery = () => {
    setSQLQuery('');
  };

  const updateCriteria = (i: number, criteriaViewModel: CriteriaDTO) => {
    const originalCriteria = criterias[i];

    // If different predicate is selected - reset condition select,
    // since conditions for strings and numbers are slightly different
    if (originalCriteria.predicateKey !== criteriaViewModel.predicateKey) {
      criteriaViewModel.conditionKey = Conditions[Criterias.find((c) => c.predicate === criteriaViewModel.predicateKey)!.type][0].key;
    }

    if (
      originalCriteria.predicateKey !== criteriaViewModel.predicateKey
      || originalCriteria.conditionKey !== criteriaViewModel.conditionKey
    ) {
      criteriaViewModel.values = {};
    }

    const updatedCriterias = [...criterias];
    updatedCriterias[i] = criteriaViewModel;

    setCriterias(updatedCriterias);
  };

  const addCriteria = () => {
    setCriterias([...criterias, defaultCriteriaViewModel]);
  };

  const resetCriterias = () => {
    setCriterias([defaultCriteriaViewModel]);
    resetSQLQuery();
  };

  const removeCriteria = (i: number) => {
    // If only one criteria left - we just want to reset it
    if (criterias.length === 1) {
      resetCriterias();
    } else {
      setCriterias(criterias.filter((_, index) => i !== index));
    }
  };

  const updateSQLQuery = () => {
    const acceptableCriterias = criterias.filter((criteria) => Object.values(criteria.values).join('') !== '');

    if (acceptableCriterias.length > 0) {
      setSQLQuery(transformCriteriasDTOToSQLStatement(acceptableCriterias));
    } else {
      resetSQLQuery();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Search for Sessions</h2>
      {
        criterias.map((criteriaViewModel, i) => (
          <div
            key={String(i)}
            className={styles.criteriaWrapper}
          >
            <Criteria
              criterias={Criterias}
              predicateKey={criteriaViewModel.predicateKey}
              onPredicateChange={(predicateKey) => { updateCriteria(i, { ...criteriaViewModel, predicateKey }); }}
              conditionKey={criteriaViewModel.conditionKey}
              onConditionChange={(conditionKey) => { updateCriteria(i, { ...criteriaViewModel, conditionKey }); }}
              values={criteriaViewModel.values}
              onValuesChange={(values) => { updateCriteria(i, { ...criteriaViewModel, values }); }}
              onRemove={() => { removeCriteria(i); }}
            />
          </div>
        ))
      }

      <Button
        title="Add"
        onClick={addCriteria}
      />
      <hr />
      <div className={styles.bottomControls}>
        <Button
          icon={faSearch}
          title="Search"
          onClick={updateSQLQuery}
          size="l"
        />
        <Button
          title="Reset"
          onClick={resetCriterias}
          size="l"
          color="secondary"
        />
      </div>

      <QueryDisplay query={sqlQuery} />
    </div>
  );
}
