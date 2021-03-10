import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {GameType} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import artistQuestionProp from '../artist-question-screen/artist-question.prop';
import genreQuestionProp from '../genre-question-screen/genre-question.prop';

import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

const GameScreen = (props) => {
  const {questions, step, onUserAnswer} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        />
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        />
      );
  }

  return <Redirect to="/" />;
};

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([artistQuestionProp, genreQuestionProp]).isRequired
  ),
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer() {
    dispatch(ActionCreator.incrementStep());
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
