import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../modules/bowling-module';
import { Bowling } from '../components';

const mapStateToProps = state => ({
  bowling: state.bowling,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(
        actions,
        dispatch
    ),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bowling);
