document.addEventListener('DOMContentLoaded', function() {
    // BMI Calculator
    document.getElementById('bmiForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const heightUnit = document.getElementById('heightUnit').value;
        const weightUnit = document.getElementById('weightUnit').value;

        // Convert units if necessary
        let heightInMeters = height;
        let weightInKg = weight;

        if (heightUnit === 'inches') {
            heightInMeters = height * 0.0254;
        } else {
            heightInMeters = height / 100;
        }

        if (weightUnit === 'lbs') {
            weightInKg = weight * 0.453592;
        }

        // Calculate BMI
        const bmi = weightInKg / (heightInMeters * heightInMeters);

        // Determine BMI category
        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

        // Display results
        document.getElementById('bmiValue').textContent = bmi.toFixed(2);
        document.getElementById('bmiCategory').textContent = category;
    });

    // KG and LBS Converter
    document.getElementById('kgToLbsForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const kg = parseFloat(document.getElementById('kg').value);
        const lbs = parseFloat(document.getElementById('lbs').value);

        // Determine conversion direction and convert
        let convertedValue = '';
        if (kg) {
            convertedValue = (kg * 2.20462).toFixed(2) + ' lbs';
        } else if (lbs) {
            convertedValue = (lbs * 0.453592).toFixed(2) + ' kg';
        } else {
            convertedValue = 'Please enter a value to convert.';
        }

        // Display results
        document.getElementById('kgLbsValue').textContent = convertedValue;
    });

    // Metric and Imperial Converter
    document.getElementById('metricToImperialForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const cm = parseFloat(document.getElementById('cm').value);
        const feet = parseFloat(document.getElementById('feet').value);
        const inches = parseFloat(document.getElementById('inches').value);

        // Determine conversion direction and convert
        let convertedValue = '';
        if (cm) {
            const totalInches = cm * 0.393701;
            const feetValue = Math.floor(totalInches / 12);
            const inchesValue = (totalInches % 12).toFixed(2);
            convertedValue = `${feetValue} ft ${inchesValue} in`;
        } else if (feet || inches) {
            const totalCm = ((feet * 12) + inches) * 2.54;
            convertedValue = `${totalCm.toFixed(2)} cm`;
        } else {
            convertedValue = 'Please enter a value to convert.';
        }

        // Display results
        document.getElementById('metricImperialValue').textContent = convertedValue;
    });
});
