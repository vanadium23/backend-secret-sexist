import React, { Component } from 'react';
import update from 'react-addons-update';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      startQuiz: false,
      answersCount: {},  
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleQuizStart = this.handleQuizStart.bind(this);
  }

  componentWillMount() {
    const shuffleQuestions = this.shuffleArray(quizQuestions);
    const shuffledAnswerOptions = shuffleQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  handleQuizStart() {
    console.log('test');
    this.setState({
      startQuiz: true,
    });
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  renderIntro() {
    return (
      <div className="container">
        <form onSubmit={this.handleQuizStart}>
          <div className="result">
          Данная викторина не призвана никого оскорбить, унизить или обидеть.
          Все отсылки к реальным событиям сделаны специально и происходили на 50-ой неделе 2017 года.
          Все фразы вы можете найти в твиттере @backendsecret или на сайте проекта http://backendsecret.ru/stats/.
          У автора викторины нет своего мнения (и яиц), поэтому стоит проходить никому.
          </div>
          <div className="start">
          <input
            className="button"
            type="submit"
            value="Я принимаю все страхи и риски"
            />
          </div>
        </form>
      </div>
    );
  }

  renderStep() {
    if (this.state.result) {
      return this.renderResult();
    }
    if (this.state.startQuiz) {
      return this.renderQuiz();
    }
    return this.renderIntro();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={'http://www.yegor256.com/images/yegor-bugayenko-192x192.png'} className="App-logo" alt="logo" />
          <h2>Backend Secret Sexist</h2>
        </div>
        {this.renderStep()}
      </div>
    );
  }

}

export default App;
