import _ from 'lodash';

export const mapScores = (frames) => {
  return _.chain(frames)
    .map(frame => _.map(frame, score => score))
    .map(rolls => {
      if (_.first(rolls) === 10 && rolls.length !== 3) return [10];
      return rolls;
    })
  .value();
};

export const calcScore = (scoreMap) => {
  const lastScore = _.chain(scoreMap).last().reduce((a, b) => a + b, 0).value();
  return _.chain(scoreMap)
    .map((round, index) => {
      const isLastRound = index === 9;
      const currentScoreTotal = isLastRound ? lastScore : _.reduce(round, (a, b) => a + b, 0);
      const strike = _.first(round) === 10;
      const spar = _.first(round) !== 10 && currentScoreTotal === 10;
      const rolls = round.length;

      const additionalPoints =
        _.chain(scoreMap)
          .slice(index)
          .flatten()
          .slice(rolls, strike ? rolls + 2 : rolls + 1)
          .reduce((a, b) => a + b, 0)
        .value();

      const score = (strike || spar) && !isLastRound ? currentScoreTotal + additionalPoints : currentScoreTotal;
      return score;
    })
    .value();
};

export default (frames) => {
  const scoreMap = mapScores(frames);
  const score = calcScore(scoreMap);
  const total = _.reduce(score, (a, b) => a + b, 0);

  return {score: total, scores: score};
};
