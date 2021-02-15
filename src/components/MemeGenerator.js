import React from 'react';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allMemeImgs: data.data.memes
                    }
                )
        });
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const length = this.state.allMemeImgs.length;
        this.setState(prevState => {
            return ({
                randomImg: prevState.allMemeImgs[this.getRandomInt(length)].url
            });
        });
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>

                    <input type="text" value={this.state.topText} onChange={this.handleChange} name="topText" />  
                    <input type="text" value={this.state.bottomText} onChange={this.handleChange} name="bottomText" />  
                
                    <button className="btn btn-dark">Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" className="rounded mx-auto d-block" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;