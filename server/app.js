import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import _ from 'lodash';
import score from './score';

const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/getScore', (req, res) => {
  const frames = _.get(req.body, 'frames');
  res.send(score(frames));
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});
