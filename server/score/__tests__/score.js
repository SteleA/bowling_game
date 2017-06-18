import score, {calcScore, mapScores} from '../';
import _ from 'lodash';

describe('score', () => {
  it ('return empty score', () => {
    expect(score()).toEqual({score: 0, scores: []});
  });
});

describe('calcScore', () => {
  it ('return empty array', () => {
    expect(calcScore()).toEqual([]);
  });
});

describe('calcScore', () => {
  it ('return empty array', () => {
    expect(calcScore([[10], [3, 4]])).toEqual([17, 7]);
  });
});

describe('calcScore', () => {
  it ('return empty array', () => {
    const score = _.reduce(calcScore([[10], [10], [10],[10],[10],[10],[10],[10],[10],[10], [10, 10] ]), (a, b) => a + b);
    expect(score).toEqual(300);
  });
});

describe('mapScores', () => {
  it ('return empty array', () => {
    expect(mapScores()).toEqual([]);
  });
});
