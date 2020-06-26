import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Criteria as CriteriaType, Predicates, PredicateKey, CriteriaInputs,
} from '../../types/Criterias';
import { Conditions } from '../../types/Condition';
import Input from '../form/Input/Input';
import * as styles from './styles.sass';
import Dropdown from '../form/Dropdown/Dropdown';

interface Props {
  criterias: CriteriaType[],
  predicateKey?: PredicateKey,
  onPredicateChange: (predicateKey: PredicateKey) => void,
  conditionKey: string,
  onConditionChange: (conditionKey: string) => void,
  values: { [key: number]: string },
  onValuesChange: (values: { [key: number]: string }) => void,
  onRemove: () => void,
}

export default function Criteria({
  criterias,
  predicateKey,
  onPredicateChange,
  conditionKey,
  onConditionChange,
  values,
  onValuesChange,
  onRemove,
}: Props) {
  const criteria = criterias.find((c) => c.predicate === predicateKey) as CriteriaType;
  const conditions = Conditions[criteria.type];

  const selectedCondition = conditions.find((c) => c.key === conditionKey);

  return (
    <div className={styles.criteriaWrapper}>
      <button
        className={styles.closeButton}
        type="button"
        onClick={onRemove}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <Dropdown
        key="predicateSelect"
        value={predicateKey as string}
        onChange={(value) => { onPredicateChange(value as PredicateKey); }}
        options={Object
          .keys(Predicates)
          .map((key) => ({ key, label: Predicates[key as PredicateKey] }
          ))}
        width={300}
      />
      {
        selectedCondition && selectedCondition.prefix && (
          <div
            className={styles.conditionLabel}
            key={`prefix_${selectedCondition.prefix}`}
          >
            { selectedCondition.prefix }
          </div>
        )
      }
      <Dropdown
        key="conditionSelect"
        value={conditionKey}
        onChange={(value) => { onConditionChange(value); }}
        options={conditions
          .map((condition) => ({ key: condition.key, label: condition.title }))}
      />
      {
        selectedCondition
        && selectedCondition
          .values
          .map((value, valueIndex) => {
            if (typeof value === 'string') {
              return (
                <div
                  className={styles.conditionLabel}
                  key={`_${value}`}
                >
                  {value}
                </div>
              );
            }

            let inputType: 'text' | 'number' = 'text';

            switch (value) {
              case CriteriaInputs.NumberInput:
                inputType = 'number';
                break;
              default:
                inputType = 'text';
            }

            return (
              <Input
                key={String(valueIndex)}
                type={inputType}
                value={values[valueIndex] || ''}
                setValue={(v) => { onValuesChange({ ...values, [valueIndex]: v }); }}
                placeholder={selectedCondition.placeholderDisplay
                  ? selectedCondition.placeholderDisplay(criteria.placeholder)
                  : criteria.placeholder}
              />
            );
          })
      }
    </div>
  );
}
