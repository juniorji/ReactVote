class QuestionBo{

    indexCategorie;
    indexQuestionnaire;
    indexQuestion;
    titre;
    question;
    image;
    reponses;

    constructor(indexCategorie, indexQuestionnaire, indexQuestion, titre, question, image, reponses) {
        this.indexCategorie = indexCategorie;
        this.indexQuestionnaire = indexQuestionnaire;
        this.indexQuestion = indexQuestion;
        this.titre = titre;
        this.question = question;
        this.image = image;
        this.reponses = reponses;
    }
}

export default QuestionBo;
