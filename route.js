import express from 'express';
import TuringMachine from './turingmachine.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { totalResult: undefined, result: undefined });
});

router.post('/', (req, res) => {
    const { m, n } = req.body;
    const mInt = parseInt(m, 10);
    const nInt = parseInt(n, 10);

    if(mInt < 0 || nInt < 0) {
        return res.render('index', { m: mInt, n: nInt, totalResult: '', result: 'Nilai m dan n tidak boleh negatif' });
    } else if (nInt > mInt) {
        return res.render('index', { m: mInt, n: nInt, totalResult: '', result: 'Nilai n harus kurang dari m' });
    } 

    const turingMachine = new TuringMachine();
    turingMachine.addTapes([turingMachine.generateString(mInt, nInt), '   ']);
    const result = turingMachine.run();
    const resultString = result[1];
    const totalResult = resultString.length;

    res.render('index', {m: mInt, n: nInt, totalResult, result: resultString });
});

export default router;
