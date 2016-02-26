import React from 'react';

class Nav extends React.Component {
    render() {
        return (
            <div className="nav">
                <div className="nav-logo">
                    Sebastian Makinson
                </div>
                <ul className="nav-links">
                    <li><a href="javascript:void(0)">Top</a></li>
                </ul>
                <div className="nav-contact">
                    <button>Contact</button>
                </div>
            </div>
        )
    }
}

export default Nav;
