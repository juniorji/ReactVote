import React, {Component} from 'react';

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {
                modal: {
                    display: "block",
                }
            }
        };

    }

    changeModalDisplay(value) {
        const state = {...this.state};
        state.style.modal.display = value;
        this.setState(state);
    }

    showModal = () => {
        switch (this.state.style.modal.display) {

            case "none":
                this.changeModalDisplay("block");
                break;

            case "block":
                this.changeModalDisplay("none");
                break;
        }
    }

    buttonHandle = (value) => {
        this.props.sendAnswerChoice(value);
    }

    sendVoteHandle = (index) => {
        const {indexCategorie,indexQuestionnaire,indexQuestion} = this.props.question;
        const {sendVote} = this.props;
        sendVote(indexCategorie, indexQuestionnaire, indexQuestion, index);
    }

    renderResponce(reponce,key) {
        const {categorie, questionnaire, questionIndex, isVoted, index} = this.props.question;
        const {sendVote} = this.props;
        return (
            <button
                key={key}
                onClick={()=>{this.sendVoteHandle(key)}}
                disabled={isVoted ? "disabled" : ""}
            >
                {reponce}
            </button>
        );
    }

    renderResponces() {
        const {reponses} = this.props.question;
        console.log("----------")
        console.log("this.props.question",this.props.question)
        console.log("responses",reponses)
        if (reponses) {
            return reponses.map((reponse, index) => {
                return this.renderResponce(reponse, index);
            });
        }
    }

    renderImage = () => {
        const {image} = this.props.question;
        let id = null;
        if (!image || image === "") {
            id = "QmTw7bopNPvZPezCgaqYALneMUcAy7CFWLxGsYAhzFqDYX";
        } else {
            id = image;
        }

        const link = `https://gateway.pinata.cloud/ipfs/${id}`;

        return (
            <img
                src={link}
                style={{maxHeight: 75}}
            />
        );
    }

    renderModal() {

        const {question, image, titre} = this.props.question;

        return (
            <div id="domanda">
                <div id="qContainer" style={{display: `${this.state.style.modal.display}`}}>
                    <div id="id01" className="question">
                        <h2>{titre}</h2>
                        {this.renderImage(question, image)}
                        <p>{question}</p>
                        <div>
                            {this.renderResponces()}

                            {/*<button type="button" className="choice">YES</button>*/}
                            {/*<button type="button" className="choice">NO</button>*/}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    render() {
        return (
            <div className="col-4">
                {this.renderModal()}
            </div>
        );
    }
}

export default Question;
