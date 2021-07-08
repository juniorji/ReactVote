import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Question from "./Question";
import Web3 from "web3";
import jsonInterface from "./jsonInterface.json";
import QuestionBo from "../bo/QuestionBo";
import "./questions.css";
import Header from "./Header";

const contractAddress = "0x36d812d504a74b4caf5ec80b9c9a753417a42164";

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
            isConnected: false,
            accounts: [],
            question: null,
            answerChoices: [],


            categories: [],
            questionnaires: [],
            questions: [],

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
            state.isConnected = true;
            state.accounts = result;
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

        // this.getQuestion();
        // this.getAnswerChoices();
        this.initCategories();
    }

    /**
     * Intéroge le contract pour récupérer la question
     * @returns {Promise<void>}
     */
    initCategories = async () => {

        // Si Web3 est connecté
        const {accounts} = this.state;
        if (accounts) {

            // Exécution d'une requete sur le Contract Solidity
            this.contract.methods.getCountCategorie().call({from: accounts[0]}).then(async (count) => {

                const categories = [];

                for (let i = 0; i < count; i++) {
                    const dataCat = await this.contract.methods.getCategorieData(i).call({from: accounts[0]})
                    categories.push(dataCat);
                }

                const state = {...this.state}
                state.categories = categories;
                this.setState(state);

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

                // console.log("getAnswerChoices", result);
                const tbResult = [];

                for (const key in result) {
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

                // console.log("addAnswer result ", result);

            }).catch((error) => {
                console.error(error);
            });
        }
    }


    questionAndResponceExist() {
        return (this.state.question && this.state.answerChoices[0]);
    }

    // TODO add question index
    renderQuestion(question) {
        return (
            <Question
                sendVote={this.sendVote}
                question={question}
                questionnaireHandle={this.questionnaireHandle}
            />
        );
    }

    categorieHandle = async (event) => {
        const indexCat = event.target.name;
        // getCountQuestionnaire(uint _categorie)
        const questionnaires = [];
        const countQuestionnaire = await this.contract.methods.getCountQuestionnaire(indexCat).call({from: this.state.accounts[0]})
        for (let i = 0; i < countQuestionnaire; i++) {
            const questionnaire = await this.contract.methods.getQuestionnaireData(indexCat, i).call({from: this.state.accounts[0]});
            questionnaires.push(questionnaire);
        }
        const state = {...this.state};
        state.questionnaires = questionnaires;
        this.setState(state);
    }

    renderCategories() {
        return this.state.categories.map((categorie, index) => {
            console.log(categorie);
            return (
                <button key={index} name={categorie.index} onClick={this.categorieHandle}>
                    {categorie.name}
                </button>
            );
        });
    }

    questionnaireHandle = async (index, categorie) => {
        // console.log("questionnaireHandle",index, categorie);
        const questions = [];
        const countQuestion = await this.contract.methods.getCountQuestions(categorie, index).call({from: this.state.accounts[0]});
        for (let i = 0; i < countQuestion; i++) {
            // getQuestionData(uint _categorie, uint _questionnaire, uint _question)
            const data = await this.contract.methods.getQuestionData(categorie, index, i).call({from: this.state.accounts[0]});
            const question = new QuestionBo(data.indexCategorie,data.indexQuestionnaire,`${i}`,data.titre,data.question,data.image,data.reponses);

            //isVotedToQuestion(uint _categorie, uint _questionnaire, uint _question)
            const dataIsVoted = await this.contract.methods.isVotedToQuestion(categorie, index, i).call({from: this.state.accounts[0]});
            question.isVoted = dataIsVoted;

            // getResultsVoteNbReponses(uint _categorie, uint _questionnaire, uint _question) public view returns (uint)
            const count = await this.contract.methods.getResultsVoteNbReponses(categorie, index, i).call({from: this.state.accounts[0]});
            for (let j = 0; j < count; j++) {
                const dataVote = await this.contract.methods.getResultsVote(categorie, index, i, j).call({from: this.state.accounts[0]});
                question.resultsVote[j] = dataVote;
            }


            console.log(question);
            questions.push(question);
        }
        const state = {...this.state};
        state.questions = questions;
        this.setState(state);
    }

    renderQuestionnaires() {
        return this.state.questionnaires.map((questionnaire, index) => {
            // console.log("questionnaire",questionnaire);
            // console.log("indexCategorie",questionnaire.indexCategorie);

            return (
                <button key={index} name={index} onClick={() => {
                    this.questionnaireHandle(index, questionnaire.indexCategorie);
                }}>
                    {questionnaire.name}
                </button>
            );
        });
    }

    questionHandle = (event) => {
        const indexCat = event.target.indexCat;
        const indexQts = event.target.indexQts;
        const index = event.target.name;
        // console.log("questionHandle",indexCat,indexQts,index);
    }

    //addVoteToQuestion(uint _categorie, uint _questionnaire, uint _question, uint _choice)
    sendVote = (categorie, questionnaire, question, choice, callback) => {
        this.contract.methods.addVoteToQuestion(categorie, questionnaire, question, choice).send({from: this.state.accounts[0]}).then((result)=>{
            callback();
        });
    }

    // TODO avec code Anis
    renderQuestions() {
        return this.state.questions.map((question, index) => {
            console.log("question", question);
            return this.renderQuestion(question);
        });
    }

    render() {
        return (
            <div>
                <Header
                    connectToWeb3={this.connectToWeb3}
                    accounts={this.state.accounts}
                />

                <h1 className="setTitle">Make your choice</h1>

                <div className="centraBottoni">

                    <div>
                        {this.renderCategories()}
                    </div>

                    <div>
                        {this.renderQuestionnaires()}
                    </div>

                    <div className={"row"}>
                        {this.renderQuestions()}
                    </div>

                    {/*{this.renderQuestion()}*/}
                </div>
            </div>
        );
    }
}

export default Questions;
