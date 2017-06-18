import {mock, mockStore} from '../../helpers/test-helpers';
import reducer, {
  nextRound,
  addScore,
  ADD_SCORE,
  NEXT_ROUND,
} from '../bowling-module';

let store;
let state;

describe('bowling-module', () => {
  beforeEach(() => {
    mock.reset();
    state = reducer(undefined, {});
    store = mockStore({bowling: state});
  });
  describe('actions', () => {
    describe('nextRound', () => {
      it('add round', () =>
        store.dispatch(nextRound())
          .then(() => {
            const actions = store.getActions();
            expect(_.find(actions, {type: NEXT_ROUND})).toBeDefined();
            expect(state.round).toBe(1);
            state = reducer(state, {type: NEXT_ROUND, payload: _.first(actions).payload});
            expect(state.round).toBe(2);
            expect(state.status).toBe('active');
          })
        );
      it('add last round', () => {
        state.round = 10;
        store = mockStore({bowling: state});
        return store.dispatch(nextRound())
          .then(() => {
            const actions = store.getActions();
            expect(_.find(actions, {type: NEXT_ROUND})).toBeDefined();
            expect(state.round).toBe(10);
            state = reducer(state, {type: NEXT_ROUND, payload: _.first(actions).payload});
            expect(state.round).toBe(null);
            expect(state.status).toBe('complete');
          });
      });
    });
    describe('addScore', () => {
      it('fail when adding empty score', () =>
        store.dispatch(addScore())
          .catch((err) => {
            expect(err).toBe('invalid score format');
          })
      );
      it('fail when adding empty array score', () =>
        store.dispatch(addScore([]))
          .catch((err) => {
            expect(err).toBe('invalid score format');
          })
      );
      it('add score', () => {
        mock.onPost('http://localhost:4000/getScore').reply(200, {score: 10, scores: [10] });
        return store.dispatch(addScore({
          round: 1,
          rolls: [
            {
              id: 'first',
              name: 'First Score',
              score: 4,
            },
            {
              id: 'second',
              name: 'Second Score',
              score: 6,
            },
          ],
          score: 10,
        }))
          .then(() => {
            const actions = store.getActions();

            expect(_.find(actions, {type: ADD_SCORE})).toBeDefined();
            expect(_.find(actions, {type: NEXT_ROUND})).toBeDefined();

            state = reducer(state, {type: NEXT_ROUND, payload: _.first(actions).payload});
            state = reducer(state, {type: ADD_SCORE, payload: _.last(actions).payload});

            expect(state.round).toBe(2);
            expect(state.totalScore).toBe(10);
            expect(state.scores[0].score).toBe(10);
          });
      });
    });
  });
});
