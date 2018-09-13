import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leads: ["Thailand","Singapore","Vietnam","Hong Kong"]
        }
    }

    render() {
        return (<div className="container header">
            <div className="py-5 text-center">
                <img className="rounded-circle" alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" 
                    width="140px" height="140px" />
                <div className="container">
                    {this.state.leads.map((lead, index)=>{
                        return (<div className="col-md-3" key={index}>
                        <p className="lead">{lead}</p>
                    </div>)
                    })}
                    
                </div>
            </div>
        </div>
    );
  }
}

export default Header;
