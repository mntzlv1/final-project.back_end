exports.calculateBMI = (req, res) => {
    const { weight, height } = req.body;
    if (!weight || !height || height <= 0) {
        return res.status(400).json({ error: 'Invalid input: Weight and height must be positive numbers' });
    }

    const bmi = weight / (height * height);
    let category = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';

    res.json({ bmi: bmi.toFixed(2), category });
};