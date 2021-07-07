import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Question from "./Question";
import Web3 from "web3";
import jsonInterface from "./jsonInterface.json";

const contractAddress = "0xbe1dC92Fe08BBFAE31E2362bF2c66EdcEE2E2196";

class Questions extends Component {

    /**
     * Ethereum Object
     */
    ethereum;

    /**
     * Instance Contract Solidity
     */
    contract;

    constructor(props) {
        super(props);
        this.ethereum = window.ethereum;

        this.state = {
            isConnected: {
                web3: false,
                web3Account: null,
            },
            question: null,
            answerChoices: [],
        };

    }

    /**
     * Enregistre le changement de question dans l'état du composant React
     * @param question
     */
    setQuestionState = (question) => {
        const state = {...this.state};
        state.question = question;
        this.setState(state);
    }

    /**
     * Enregistre le changement des réponses proposées dans l'état du composant React
     * @param responses
     */
    setAnswerChoicesState = (responses) => {
        const state = {...this.state};
        state.answerChoices = responses;
        this.setState(state);
    }

    /**
     * Connexion Web3JS
     */
    connectToWeb3 = () => {
        this.ethereum.request({method: 'eth_requestAccounts'}).then((result) => {

            const state = {...this.state};
            state.isConnected.web3 = true;
            state.isConnected.web3Account = result[0];
            this.setState(state);

            this.initEthereumEvents();
            this.initContract();

        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * Initialisation du "Circle Life" de notre connexion Web3JS
     */
    initEthereumEvents = () => {

        this.ethereum.on('accountsChanged', (accounts) => {
            if (this.ethereum.isConnected()) {
                this.connectToWeb3();
            }
        });

        this.ethereum.on('disconnect', (accounts) => {
            //this.disconnectedWeb3();
        });
    }

    initContract = () => {

        // Chargement du contract
        const web3 = new Web3(Web3.givenProvider);
        const myContract = new web3.eth.Contract(
            jsonInterface,
            contractAddress
        );

        // Sauvegarde dans une variable local du composant React
        this.contract = myContract;

        this.getQuestion();
        this.getAnswerChoices();
    }

    /**
     * Intéroge le contract pour récupérer la question
     * @returns {Promise<void>}
     */
    getQuestion = async () => {

        // Si Web3 est connecté
        const {web3Account} = this.state.isConnected;
        if (web3Account) {

            // Exécution d'une requete sur le Contract Solidity
            this.contract.methods.question().call({from: web3Account}).then((result) => {

                // Enregistre la question dans l'état du composant react
                this.setQuestionState(result);

            }).catch((error) => {
                console.error(error);
            });

        }
    }


    /**
     * Intéroge le contract pour récupérer les réponses possible
     * @returns {Promise<void>}
     */
    getAnswerChoices = async () => {

        // Si Web3 est connecté
        const {web3Account} = this.state.isConnected;
        if (web3Account) {

            // Exécution d'une requete sur le Contract Solidity
            this.contract.methods.getAnswerChoices().call({from: web3Account}).then((result) => {

                console.log("getAnswerChoices", result);
                const tbResult = [];

                for(const key in result){
                    const item = result[key];
                    tbResult.push(item);
                }

                this.setAnswerChoicesState(tbResult);

            }).catch((error) => {
                console.error(error);
            });
        }
    }

    sendAnswerChoice = async (responce) => {

        // Si Web3 est connecté
        const {web3Account} = this.state.isConnected;
        if (web3Account) {

            // Exécution d'une requete sur le Contract Solidity
            this.contract.methods.addAnswer(responce).send({from: web3Account}).then((result) => {

                console.log("addAnswer result ",result);

            }).catch((error) => {
                console.error(error);
            });
        }
    }
    

    questionAndResponceExist() {
        return (this.state.question && this.state.answerChoices[0]);
    }

    renderQuestion() {
        if (this.questionAndResponceExist()) {

            // const question = "Quelle est la question ?";
            // const responces = ["Yes","No"];

            const question = this.state.question;
            const responces = this.state.answerChoices;

            return (
                <Question question={question} responces={responces} sendAnswerChoice={this.sendAnswerChoice}/>
            )
        }
    }

    render() {
        return (
            <div class="centraBottoni">
                <button onClick={this.connectToWeb3}>Connexion Web3</button><br/><br/>
                {this.state.isConnected.web3Account}
                <br/>
                {this.renderQuestion()}
            </div>
        );
    }
}

export default Questions;
