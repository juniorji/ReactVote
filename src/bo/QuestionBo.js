class QuestionBo{

    indexCategorie;
    indexQuestionnaire;
    indexQuestion;
    titre;
    question;
    image;
    reponses;
    isVoted;
    resultsVote;

    constructor(indexCategorie, indexQuestionnaire, indexQuestion, titre, question, image, reponses) {
        this.indexCategorie = indexCategorie;
        this.indexQuestionnaire = indexQuestionnaire;
        this.indexQuestion = indexQuestion;
        this.titre = titre;
        this.question = question;
        this.image = image;
        this.reponses = reponses;
        this.isVoted = false;
        this.resultsVote = [];
    }
}

export default QuestionBo;
