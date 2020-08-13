import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetch_question} from '../actions/questionAction';
import { Segment } from 'semantic-ui-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Image } from 'semantic-ui-react'
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

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
      
      
        <Row xs={1} sm={2} md={3} lg={4} xl={5} style={{margin: '2%'}}>
        {this.state.questionList.map(data => {
          return (
            <Col key={data.id} >
              
              <Card style={{margin: '2%'}}>
                <Card.Content>
                  <Card.Header style={{textAlign: 'left'}}>Kelas {data.data.class}</Card.Header>
                  <Card.Header style={{textAlign: 'left'}}>{data.data.subject}</Card.Header>
                  <Card.Header style={{textAlign: 'left'}}>Kesulitan: {data.data.difficulty}</Card.Header>
                </Card.Content>
                <div style={{padding: '5%', textAlign: 'left'}}>
                  <b>Pertanyaan</b>
                  <CKEditor style={{minHeight: '50px', maxHeight: '50px'}}
                      editor={ DecoupledEditor }
                      config={{
                        toolbar: []
                      }}
                      data={data.data.question}
                      onInit={ editor => {
                          editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                          );
                      } }
                      onChange={ ( event, editor ) => {
                          //const data = editor.getData();
                      } }
                      onBlur={ ( event, editor ) => {
                      } }
                      onFocus={ ( event, editor ) => {
                      } }
                  />
                </div>
                <div style={{padding: '5%', textAlign: 'left'}}>
                  <b>Jawaban</b>
                  <CKEditor style={{minHeight: '50px', maxHeight: '50px'}}
                      editor={ DecoupledEditor }
                      config={{
                        toolbar: []
                      }}
                      data={data.data.answer}
                      onInit={ editor => {
                          editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                          );
                      } }
                      onChange={ ( event, editor ) => {
                          //const data = editor.getData();
                      } }
                      onBlur={ ( event, editor ) => {
                      } }
                      onFocus={ ( event, editor ) => {
                      } }
                  />
                </div>
              </Card>
              
            </Col>
          )
        })}
        </Row>
      

    )
  }

  render(){
    return (
      <div>
          <br/>
          <h1>Lihat Soal</h1>
          {this.state.isFetched ? <Container>{this._renderQuestionList()}</Container> : <h4>Mengambil data...</h4>}
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
