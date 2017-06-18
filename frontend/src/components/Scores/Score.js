import React from 'react';
import _ from 'lodash';

const score = (props) => {
  const isExtra = props.rolls.length === 3;
  return (
    <div className={`score ${props.active ? 'active' : ''}`}>
      <span className="round">{props.round}</span>
      <div className={`score-body ${isExtra ? 'extra-roll' : ''}`}>
        {_.map(props.rolls, roll =>
          <span
            key={_.uniqueId()}
            className="score-box"
          >{roll.score}</span>)}
        <div className="currentScore">{props.score}</div>
      </div>
    </div>
  );
};

export default score;
