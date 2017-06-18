import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import Score from './Score';
import './Scores.scss';

const scores = (props) => {
  return (
    <Row className="scores">
      {_.map(props.scores, score =>
        <Score key={_.uniqueId()} {...score} active={score.round === props.round} />)}
    </Row>
  );
};

export default scores;
