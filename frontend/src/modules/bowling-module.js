import { createReducer } from 'redux-action';
import _ from 'lodash';
import axios from 'axios';

export const ADD_SCORE = 'Bowling/ADD_SCORE';
export const NEXT_ROUND = 'Bowling/NEXT_ROUND';

const mapFrames = (scores) => {
  let frames = [];
  _.forEach(scores, (score) => {
    const frame = {};
    _.forEach(score.rolls, (roll) => {
      if (_.isNumber(roll.score)) {
        frame[roll.id] = roll.score;
      }
    });
    if (!_.isEmpty(frame)) {
      frames = [...frames, frame];
    }
  });
  return frames;
};

const initScores = () => {
  const scores = [];

  for (let i = 1; i < 11; i += 1) {
    const score = {
      round: i,
      rolls: [
        {id: 'first', name: 'First Score'},
        {id: 'second', name: 'Second Score'},
      ],
    };
    if (i === 10) score.rolls.push({id: 'third', name: 'Third Score'});
    scores.push(score);
  }
  return scores;
};

export const nextRound = () => (dispatch, getState) => {
  const currentRound = getState().bowling.round;
  const isLastRound = currentRound === 10;
  const status = isLastRound ? 'complete' : 'active';
  const round = isLastRound ? null : currentRound + 1;
  return new Promise(resolve => resolve(dispatch({
    type: NEXT_ROUND,
    payload: {
      round,
      status,
    },
  })));
};

export const addScore = newScore => (dispatch, getState) => {
  if (newScore) {
    const scores = getState().bowling.scores.slice();
    const scoreIndex = _.findIndex(scores, {round: _.get(newScore, 'round')});
    if (scoreIndex > -1) {
      scores[scoreIndex] = Object.assign({}, newScore);
      const frames = mapFrames(scores);
      return axios.post('http://localhost:4000/getScore', {frames})
        .then(({data}) => {
          _.forEach(data.scores, (score, i) => {
            scores[i].score =
              _.chain(data.scores)
                .slice(0, i + 1)
                .reduce((a, b) => a + b, 0)
                .value();
          });

          dispatch(nextRound());
          return dispatch({
            type: ADD_SCORE,
            payload: {
              scores,
              totalScore: data.score,
            },
          });
        });
    }
  }
  return new Promise((resolve, reject) => reject('invalid score format'));
};

const defaultState = {
  round: 1,
  totalScore: 0,
  scores: initScores(),
  loading: true,
  status: 'active',
};

export default createReducer(defaultState, {
  [ADD_SCORE]: state => state,
  [NEXT_ROUND]: state => state,
});

export const actions = {
  addScore,
};
