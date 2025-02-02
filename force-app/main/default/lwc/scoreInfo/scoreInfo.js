import { LightningElement, api } from 'lwc';
export default class ScoreInfo extends LightningElement {
    
    @api score;
    @api attemptId;
    @api numberOfQuestions;

    get numberofQuestionsCorrect(){
        return Math.floor((this.score / 100) * this.numberOfQuestions);
    }

    get numberOfWrongQuestions(){
        return this.numberOfQuestions - this.numberofQuestionsCorrect;
    }

    handleDeleteAttempt(){
        const deleteEvent = new CustomEvent('deleteattempt',{
            detail: this.attemptId
        });
        this.dispatchEvent(deleteEvent);
    }

}