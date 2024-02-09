import React from 'react';

const Header = ({logoName, desc1, desc2}) => {
    const imagePath = require(`../images/${logoName}`);

    return (
    <div className="header">
        <div className="row text-center mb-3">
          <div className="col" id="logo">
            <img src={imagePath} className="img-fluid"/>
          </div>
        </div>

        <div className="row text-center mb-3 section">
          <div className="col header">

            <div className="row">
              <div className="col" id="fancy">
                {desc1}
              </div>
            </div>

            <div className="row">
              <div className="col">
                {desc2}
              </div>
            </div>

          </div>
        </div>
    </div>
    );
};

export default Header;