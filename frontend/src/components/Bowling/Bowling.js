import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import ScoreForm from '../Scores/ScoreForm';
import {Scores} from '../';
import './Bowling.scss';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getActiveRound() {
    return _.find(this.props.bowling.scores.slice(), {round: this.props.bowling.round}) || {};
  }

  render() {
    return (
      <Grid>
        <Row className="bowling">
          <Scores scores={this.props.bowling.scores} round={this.props.bowling.round} />
          {this.props.bowling.status === 'active' &&
            <Col sm={4} smOffset={4}>
              <ScoreForm addScore={this.props.actions.addScore} round={this.getActiveRound()} />
            </Col>
          }
        </Row>
      </Grid>
    );
  }
}

export default Todo;
