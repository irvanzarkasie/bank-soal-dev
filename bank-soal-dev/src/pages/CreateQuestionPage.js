import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

class CreateQustionPage extends React.Component {
    
    render(){
    if(this.props.authenticationState.get('role') === 'teacher'){
        return (
            <div className="editor">
                <h1>Create New Question Page</h1>
                <br/>
                <CKEditor
                    onInit={ editor => {
                        
                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    } }
                    onChange={ ( event, editor ) => console.log( { event, editor } ) }
                    editor={ DecoupledEditor }
                    data="<p>Create question here</p>"
                />
            </div>
        );
    } else {
        return (<Redirect to="/"/>)
    }
  }
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer')
})

export default connect(mapStateToProps, null)(CreateQustionPage);
