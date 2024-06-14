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
