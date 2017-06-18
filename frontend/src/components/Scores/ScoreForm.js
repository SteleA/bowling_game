import React, {Component} from 'react';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import ScoreInput from './ScoreInput';

class ScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {},
    };
  }

  onAddScores(e) {
    if (e) e.preventDefault();
    const rolls = _.map(this.props.round.rolls, roll =>
      ({
        ...roll,
        score: this.getNumber(this.state.scores[roll.id]),
      }));

    const round =
      Object.assign({},
        this.props.round,
        {rolls, score: this.calculateScores(this.state.scores)});

    this.props.addScore(round);
    this.setState({scores: {}});
  }

  getNumber(num) {
    const number = _.toNumber(num);
    return _.isNaN(number) ? 0 : number;
  }

  setScore(id, score) {
    const scores = Object.assign({}, this.state.scores);
    scores[id] = score;
    const totalScore = this.calculateScores(scores) <= 10;
    const lastRound = this.calculateScores(scores) <= 30 && this.props.round.round === 10;
    if ((totalScore || lastRound) && score >= 0) {
      this.setState({scores});
    }
    return false;
  }

  calculateScores(scores) {
    return _.chain(scores)
        .map(score => score)
        .map(_.toNumber)
        .reduce((acc, cur) => acc + cur)
        .value();
  }

  render() {
    return (
      <div>
        {_.map(this.props.round.rolls, roll =>
          <ScoreInput
            id={`score-input-${roll.id}`}
            key={`score-input-${roll.id}`}
            onChange={score => this.setScore(roll.id, score)}
            input={this.getNumber(this.state.scores[roll.id])}
            placeholder={roll.name}
          />
        )}
        <Button block onClick={() => this.onAddScores()}>Submit Scores</Button>
      </div>
    );
  }
}

export default ScoreForm;
