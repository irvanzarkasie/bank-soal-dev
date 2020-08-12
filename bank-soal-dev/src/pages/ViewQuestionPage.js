import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetch_question} from '../actions/questionAction';
import ReactHtmlParser from 'react-html-parser';

class ViewQuestionPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        questionList: '',
        class: '',
        subject: '',
        difficulty: '',
        isLoading: false,
        isFetched: false 
    }
  }

  componentDidMount(){
    
    if(!this.state.isFetched){
      this.props.fetch_question({
        class: this.state.class,
        subject: this.state.subject,
        difficulty: this.state.difficulty
      })
    }

  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props !== nextProps || this.state !== nextState;
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.setState({
        questionList: this.props.viewQuestionState.get('questionList'),
        class: this.props.viewQuestionState.get('class'),
        subject: this.props.viewQuestionState.get('subject'),
        difficulty: this.props.viewQuestionState.get('difficulty'),
        isLoading: this.props.viewQuestionState.get('isLoading'),
        isFetched: this.props.viewQuestionState.get('isFetched')
      })
    }
  }

  _renderQuestionList(){
    return (
      <table style={{display: 'block', width: '100%', overflowX: 'auto'}}>
        <thead>
          <tr>
            <th>Kelas</th>
            <th>Mata Pelajaran</th>
            <th>Tingkat Kesulitan</th>
            <th>Pertanyaan</th>
          </tr>
        </thead>
        <tbody>
        {this.state.questionList.map(data => {
          return (
            <tr key={data.id}>
              <td>{data.data.class}</td>
              <td>{data.data.subject}</td>
              <td>{data.data.difficulty}</td>
              <td>{ReactHtmlParser(data.data.question)}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  render(){
    return (
      <div>
          <br/>
          <h1>Lihat Soal</h1>
          <br/>
          {this.state.isFetched ? this._renderQuestionList() : <h4>Mengambil data...</h4>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer'),
  viewQuestionState: state.get('viewQuestionReducer')
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetch_question
    }, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestionPage);
