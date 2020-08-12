import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
  render(){
    return (
        <div>
            <h1>Bank Soal</h1>
            <br/>
            <table className="home-menu">
              <tbody>
                <tr>
                  <th>
                    <Link to="/view_question"><i className="fa fa-folder-open fa-4x"/></Link>
                  </th>
                  <th>
                    <Link to="/create_question"><i className="fa fa-file-text fa-4x"/></Link>
                  </th>
                </tr>
                <tr>
                  <th>
                    <Link to="/view_question"><p>Lihat Soal</p></Link>
                  </th>
                  <th>
                    <Link to="/create_question"><p>Buat Soal Baru</p></Link>
                  </th>
                </tr>
              </tbody>
            </table>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticationState: state.get('authenticationReducer')
})

export default connect(mapStateToProps, null)(HomePage);
