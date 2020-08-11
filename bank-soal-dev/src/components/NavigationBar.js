import React from 'react';
import {Link} from 'react-router-dom';

function NavigationBar() {

  const style = {
      color: 'white'
  }

  return (
    <nav>
        <Link style={style} to="/"><h3 className="nav-links">Logo</h3></Link>
        <ul className="nav-links">
            <Link style={style} to="/about"><li><h3>About</h3></li></Link>
            <Link style={style} to="/contact"><li><h3>Contact</h3></li></Link>
        </ul>
    </nav>
  );
}

export default NavigationBar;
