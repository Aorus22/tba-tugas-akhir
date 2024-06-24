import readline from 'readline';
import TuringMachine from './turingmachine.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = (query) => {
    return new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));
}

const main = async () => {
    const turingMachine = new TuringMachine()

    const m = await getInput("Masukkan m: ");
    const n = await getInput("Masukkan n: ");
    rl.close();

    turingMachine.addTapes([turingMachine.generateString(m, n), "   "])

    turingMachine.isVisualized = false
    const result = turingMachine.run()
    console.log( "Hasil:\n" + result[1])
    console.log( "Total: " + result[1].length)
};

main();
