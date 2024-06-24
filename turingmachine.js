import chalk from 'chalk';

class TuringMachine {
    constructor() {
        this.isVisualized = false

        this.initialState = "q0"
        this.finalStates = "q18"
        this.totalTapes = 2
        this.blankSymbol = " "
        this.transitions = {
            'q0,0 ': ['q0','0 ','RS'],
            'q0,1 ': ['q0','1 ','RS'],
            'q0,  ': ['q1','  ','LS'],
        
            'q1,0 ': ['q2','  ','LS'],
            'q1,1 ': ['q18','10','SS'],
        
            'q2,0 ': ['q2','0 ','LS'],
            'q2,1 ': ['q2','1 ','LS'],
            'q2,  ': ['q3','  ','RS'],
        
            'q3,0 ': ['q3','00','RR'],
            'q3,1 ': ['q4','1 ','RL'],
        
            'q4,00': ['q4','00','RS'],
            'q4,0Y': ['q4','0Y','RS'],
            'q4, 0': ['q5',' 0','LS'],
            'q4, Y': ['q5',' Y','LS'],
        
            'q5,00': ['q6',' 0','LS'],
            'q5,0Y': ['q6',' Y','LS'],
            'q5,10': ['q17','10','SS'],
            'q5,1Y': ['q17','1Y','SS'],
        
            'q6,00': ['q6','00','LS'],
            'q6,10': ['q6','10','LS'],
            'q6,0Y': ['q6','0Y','LS'],
            'q6,1Y': ['q6','1Y','LS'],
            'q6, 0': ['q7',' 0','RS'],
            'q6, Y': ['q7',' Y','RS'],
        
            'q7,00': ['q8',' 0','RS'],
            'q7,0Y': ['q8',' Y','RS'],
        
            'q8,00': ['q8','00','SL'],
            'q8,0Y': ['q8','00','SL'],
            'q8,0X': ['q8','00','SL'],
            'q8,0 ': ['q9','X ','RR'],
        
            'q9,00': ['q10','0X','SR'],
            'q9,0Y': ['q12','XY','RS'],
        
            'q10,00': ['q10','00','SR'],
            'q10,0Y': ['q10','0Y','SR'],
            'q10,0 ': ['q11','0Y','SL'],
        
            'q11,00': ['q11','00','SL'],
            'q11,0Y': ['q11','0Y','SL'],
            'q11,0X': ['q9','0X','SR'],
        
            'q12,0Y': ['q13','0Y','SL'],
            'q12,1Y': ['q14','1Y','LS'],
        
            'q13,0X': ['q13','00','SL'],
            'q13,0 ': ['q9','0 ','SR'],
        
            'q14,XY': ['q14','0Y','LS'],
            'q14, Y': ['q15',' Y','RS'],
        
            'q15,0Y': ['q15','0Y','SR'],
            'q15,0 ': ['q16','0 ','SL'],
        
            'q16,0Y': ['q16','0Y','RS'],
            'q16,1Y': ['q4','1Y','RS'],
        
            'q17,1Y': ['q17','10','SL'],
            'q17,1X': ['q17','10','SL'],
            'q17,10': ['q18','10','SS'],
            'q17,1 ': ['q18','1 ','SS'],
        }

        this.currentState = this.initialState
        this.tapes = [
            // {
            //     content: ["0", "0", "0", "0", "0", "0", "1", "0", "0"],
            //     head: 0
            // },
        ];
    }

    generateString = (m, n) => '0'.repeat(m) + '1' + '0'.repeat(n);

    addTapes(tapeContent = [""]) {
        for (let i = 0; i < this.totalTapes; i++) {
            const currentContent = [...tapeContent[i]]
            const currentTape = {
                content: currentContent,
                head: 0
            }
            this.tapes.push(currentTape)
        }
    }

    formatTapes(){
        return this.tapes.map((tape) => {
            const content = tape.content;
            const formattedContent = content.filter(char => char !== ' ').join('');
            return `${formattedContent}`
        })
    };

    getTransitionKeys(){
        let currentSymbols = ""

        for (let i = 0; i < this.totalTapes; i++){
            const currentHead = this.tapes[i].head
            const symbol = this.tapes[i].content[currentHead] || this.blankSymbol
            currentSymbols = currentSymbols + symbol
        }

        return `${this.currentState},${currentSymbols}`
    }

    run(){
        while (this.currentState !== this.finalStates) {

            const key = this.getTransitionKeys();

            if(this.isVisualized === true){
                this.visualizeTapeTerminal()
            }

            try {
                const [ newState, writeSymbol, direction ] = this.transitions[key]

                this.currentState = newState;

                for (let i = 0; i < this.totalTapes; i++) {
                    const currentNewTapeSymbol = writeSymbol[i];
                    const currentTapeHead = this.tapes[i].head;
                    const currentTapeNewDirection = direction[i];

                    this.tapes[i].content[currentTapeHead] = currentNewTapeSymbol;

                    if (currentTapeNewDirection === "R") {
                        this.tapes[i].head++;
                    }

                    if (currentTapeNewDirection === "L") {
                        this.tapes[i].head--;
                        if (this.tapes[i].head < 0) {
                            this.tapes[i].content.unshift(this.blankSymbol);
                            this.tapes[i].head = 0;
                        }
                    }
                }
            } catch (error) {
                console.error(error)
                console.error(`Error: Transisi tidak ditemukan untuk ${key}`);
                break;
            }
        }

        return this.formatTapes()
    }

    visualizeTapeTerminal(){
        this.tapes.forEach((tape) => {
            const content = tape.content.map((char, index) => {
                if (index === tape.head) {
                    return chalk.red(char);
                } else {
                    return char;
                }
            }).filter(char => char !== ' ').join('');
    
            console.log(content);
        });
        console.log("")
    }
}


export default TuringMachine