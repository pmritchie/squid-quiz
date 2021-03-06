
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styles from './app.module.css';
import Header from './header';
import Login from './login';
import List from './quizzes/list';
import Landing from './quizzes/landing';
import Quiz from './quizzes/quiz';
import QuestionForm from './forms/question';
import QuizDetail from './quizzes/detail';
import QuizForm from './forms/quiz';
import QuestionDetail from './questions/detail';
import ChoiceForm from './forms/choice';
import { store } from './store';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles.body}>
            <Route path="/" component={Header} />
            <main className={styles.main__container}>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/quiz/:id" exact component={Quiz} />
              <Route path="/admin/quizzes" exact component={List} />
              <Switch>
                <Route path="/admin/quizzes/new" exact component={QuizForm} />
                <Route path="/admin/quizzes/edit/:id" exact component={QuizForm} />
                <Route path="/admin/quizzes/:id" exact component={QuizDetail} />
              </Switch>
              <Switch>
                <Route path="/admin/questions/new/:quizId" exact component={QuestionForm} />
                <Route path="/admin/questions/edit/:id" exact component={QuestionForm} />
                <Route path="/admin/questions/:id" exact component={QuestionDetail} />
              </Switch>
              <Switch>
                <Route path="/admin/choices/new/:questionId" exact component={ChoiceForm} />
                <Route path="/admin/choices/edit/:id" exact component={ChoiceForm} />
              </Switch>
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
