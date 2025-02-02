import { LightningElement } from 'lwc';

const devWeight = 0.23;
const processWeight = 0.30;
const uiWeight = 0.25;
const testWeight = 0.22;
const passingScore = 68;


export default class Pd1ScoreChecker extends LightningElement {

    devFundamentalScore = 0;
    processAutoScore    = 0;
    userInterfaceScore  = 0;
    testingDebugScore   = 0;

    certificationScore = 0;
    numberOfQuestions = 60;

    showResources = false;
    showGoodJob = false;

    currentHistoryId = 0;

    attemptHistory = [];

    calculateScore(){
        let devFund = this.devFundamentalScore * devWeight;
        let processAuto = this.processAutoScore * processWeight;
        let userInt = this.userInterfaceScore * uiWeight;
        let testDebug = this.testingDebugScore * testWeight;
        this.certificationScore = devFund + processAuto + userInt + testDebug;

        this.showResourceIfFailed();
        this.addAttemptHistory(this.certificationScore);
    }

    handleChange(event){
        console.log(event.target.name, event.target.value);
        let value = Number(event.target.value);
        const inputName = event.target.name;

        if(inputName === 'devFundamentals'){
            this.devFundamentalScore = value;
        } else if (inputName === 'processAutoLogic'){
            this.processAutoScore = value;
        } else if (inputName === 'userInterface'){
            this.userInterfaceScore = value;
        } else if (inputName === 'testingDebugging'){
            this.testingDebugScore = value;
        }
    }

    showResourceIfFailed(){
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else{
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }

    addAttemptHistory(Score){
        this.currentHistoryId ++
        const attempt = 
            {
                Id: this.currentHistoryId, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event){
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt=> attempt.Id != attemptId);
    }

    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
    }
}