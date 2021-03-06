import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizContainer from '../../containers/quizzes';


class Quiz extends React.Component {
  componentDidMount() {
    const { getQuizQuestions, match: { params: { id } } } = this.props;
    getQuizQuestions(id);
  }

  render() {
    const { questions, choices } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>Quiz Away!</h1>
        <ul className={styles.list}>
          {questions.map(question => (
            <li className={styles.quiz__list__item} key={question.id}>
              <span className={styles.list__item__title}>{question.title}</span>
              <div className={styles.choices__container}>
                {
                  choices.map((choice) => {
                    if (choice.questionId === question.id) {
                      return (
                        <button type="button" className={styles.choice__button} key={choice.id}>{choice.value}</button>
                      );
                    }
                    return null;
                  })}
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>

    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  choices: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuizQuestions: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
};

Quiz.defaultProps = {
};

export default QuizContainer(Quiz);
