import React, { Component } from 'react';
import Card from './Card'
class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            promote: {
                title: "เป็นมากกว่าแค่ Hero", description: "สมัครงาน กับ บริษัทชั้นนํา และ Startup ทั่ว Asia ได้ที่นี่"
            },
            cards: [
                { title: "Ironman", description: "Tony Stark"},
                { title: "Captain American", description: "Steve Roger"},
                { title: "Doctor Strange", description: "Stephen Strange"},
                { title: "Winter Soldier", description: "Bucky Band"},
                { title: "Black Widow", description: "Natasha Romanoff"},
                { title: "Hawkeye", description: "Clint Barton"},
                { title: "Nick Fury", description: "Just Nick Fury"},
                { title: "QuickSliver", description: "Pietro Maximoff"},
                
            ]
        }
    }

    render() {
        return (<main role="main">
        <section className="jumbotron text-center">
        <div className="container">
            <h1 className="jumbotron-heading mx-auto">{this.state.promote.title}</h1>
            <p className="lead text-muted">{this.state.promote.description}</p>
        </div>
        </section>
        <div className="album py-5 bg-light">
        <div className="container">
            <div className="row">
                {this.state.cards.map((card, index) => {
                    return <div className="col-md-3" key={index}>
                            <Card info={card} />
                        </div>
                })}
            </div>
        </div>
        </div>
    </main>);
    }
}

export default MainPage;
