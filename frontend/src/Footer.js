import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                logo: "",
                description: "Avenger แหล่งรวบรวมบุคลากรเทคโนโลยีชั้นนำแห่งเอเชีย"
            },
            contact: [
                {
                    logo:'fa fa-facebook',
                    title:'facebook',
                    url: '#'
                },
                {
                    logo:'fa fa-twitter',
                    title:'twitter',
                    url: '#'
                },
                {
                    logo:'fa fa-instagram',
                    title:'instagram',
                    url: '#'
                },
                {
                    logo:'fa fa-linkedin',
                    title:'linkedin',
                    url: '#'
                }
            ],
            siteMap: [{
                title: 'เกี่ยวกับเรา',
                links: [
                    {
                        title:'เกี่ยวกับเรา',
                        url: '#'
                    },
                    {
                        title:'ร่วมงานกับเรา',
                        url: '#'
                    },
                    {
                        title:'บทความ',
                        url: '#'
                    },
                    {
                        title:'เงื่อนไขการให้บริการ',
                        url: '#'
                    }
                ]
            },{
                title: 'สำหรับคนหางาน',
                links: [
                    {
                        title:'แนะนำให้เพื่อน',
                        url: '#'
                    },
                    {
                        title:'คำถามที่พบบ่อย',
                        url: '#'
                    },
                ]
            },{
                title: 'สำหรับบริษัท',
                links: [
                    {
                        title: 'คำถามที่พบบ่อย',
                        url: '#'
                    },
                    {
                        title: 'สิ่งเราให้บริการ',
                        url: '#'
                    }
                ]
            }]
        }
    }

    gridSizeForSection() {
        return Math.round((12-4)/this.state.siteMap.length)
    }

    render() {
        return (<footer>
            <div className="container">
                {this.state.siteMap.map((section, sectionIndex) => {
                    return <div className={"col-md-"+this.gridSizeForSection()} key={sectionIndex}>
                    <h3>{section.title}</h3>
                    <ul>
                    {section.links.map((link, index) => <li key={index}><a href={link.url}>{link.title}</a></li>)}
                    </ul>
                </div>
                })}
                <div className="col-md-3">
                    <div>
                        <img src={this.state.info.logo} alt=""/>
                    </div>
                    <div>{this.state.info.description}</div>
                    ติดตามเรา {this.state.contact.map((channel, index) => {
                        return (<button type="button" key={index} className="btn btn-light"><i className={channel.logo}></i></button>)
                    })}
                </div>
            </div>
        </footer>)
    }
}

export default Footer;