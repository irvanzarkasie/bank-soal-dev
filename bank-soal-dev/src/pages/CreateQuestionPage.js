import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Dropdown } from 'semantic-ui-react';
import {submit_question} from '../actions/questionAction';

class CreateQustionPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questionText: '',
            answerText: '',
            class: '',
            subject: '',
            difficulty: '',
            isLoading: false,
            isSubmitted: false 
        }
    
        this._onQuestionChange = this._onQuestionChange.bind(this)
    
        this._onAnswerChange = this._onAnswerChange.bind(this)

        this._onKelasSelected = this._onKelasSelected.bind(this)

        this._onMatpelSelected = this._onMatpelSelected.bind(this)

        this._onKesulitanSelected = this._onKesulitanSelected.bind(this)

        this._submitQuestion = this._submitQuestion.bind(this)
    }

    _onQuestionChange(data){
        this.setState({
            questionText: data
        })
    }

    _onAnswerChange(data){
        this.setState({
            answerText: data
        })
    }

    _onKelasSelected(e, {name, value}){
        this.setState({
            class: value
        })
    }

    _onMatpelSelected(e, {name, value}){
        this.setState({
            subject: value
        })
    }

    _onKesulitanSelected(e, {name, value}){
        this.setState({
            difficulty: value
        })
    }

    async _submitQuestion(){
        this.setState({
            isLoading: true
        })

        const data = {
            question: this.state.questionText,
            answer: this.state.answerText,
            class: this.state.class,
            subject: this.state.subject,
            difficulty: this.state.difficulty
        }

        console.log("### SUBMIT QUESTION ###", data)
        const submitResponse = await this.props.submit_question(data)

        console.log("Receive question submit response")
        console.log(submitResponse)

        this.setState({
            isLoading: false
        })
    }

    render(){
    if(this.props.authenticationState.get('role') === 'teacher'){
        return (
            <div className="editor">
                <br/>
                <h1>Buat Soal Baru</h1>
                <br/>
                <div className="selection-panel">
                    <div className="dropdown-container">
                        <label>Kelas</label> <br/>
                        <Dropdown placeholder='Kelas' onChange={this._onKelasSelected} search selection options={[1,2,3,4,5,6,7,8,9,10,11,12].map(data => ({key: data, text: data, value: data}))} />
                    </div>
                    <div className="dropdown-container">
                        <label>Mata Pelajaran</label> <br/>
                        <Dropdown placeholder='Mata Pelajaran' onChange={this._onMatpelSelected} search selection options={["Bahasa Indonesia", "Matematika"].map(data => ({key: data, text: data, value: data}))} />
                    </div>
                    <div className="dropdown-container-end">
                        <label>Tingkat Kesulitan</label> <br/>
                        <Dropdown placeholder='Tingkat Kesulitan' onChange={this._onKesulitanSelected} search selection options={["Mudah", "Sedang", "Sulit"].map(data => ({key: data, text: data, value: data}))} />
                    </div>
                </div>
                <div style={{outline: '1px solid black', padding: '10px', marginTop: '10px', marginBottom: '10px', marginLeft: '15%', marginRight: '15%'}}>
                    <h3>Pertanyaan</h3>
                    <CKEditor style={{minHeight: '200px', maxHeight: '200px'}}
                        onInit={ editor => {
                            
                            // Insert the toolbar before the editable area.
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData()
                            this._onQuestionChange(data)    
                        }}
                        editor={ DecoupledEditor }
                        data="<p>Buat soal baru di sini</p><p>Konten dari MS Word dapat di-paste ke sini</p>"
                    />
                </div>
                <br/>
                <div style={{outline: '1px solid black', padding: '10px', marginTop: '10px', marginBottom: '10px', marginLeft: '15%', marginRight: '15%'}}>
                    <h3>Jawaban</h3>
                    <CKEditor style={{minHeight: '200px', maxHeight: '200px'}}
                        onInit={ editor => {
                            
                            // Insert the toolbar before the editable area.
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData()
                            this._onAnswerChange(data) 
                        }}
                        editor={ DecoupledEditor }
                        data="<p>Cantumkan kunci jawaban di sini</p>"
                    />
                </div>
                <div className="question-submit-btn">
                    <br/>
                    {this.state.isLoading ? <label>Menyimpan....</label> : <button onClick={this._submitQuestion}>Simpan</button> }
                    <br/>
                </div>
            </div>
        );
    } else {
        return (<Redirect to="/"/>)
    }
  }
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer'),
  createQuestionState: state.get('createQuestionReducer')
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        submit_question
    }, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(CreateQustionPage);
