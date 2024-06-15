document.addEventListener('DOMContentLoaded', function() {
    // BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(event) {
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

            // Determine BMI category for male and female
            const categoryMale = getBMICategory(bmi, 'male');
            const categoryFemale = getBMICategory(bmi, 'female');

            // Display results
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <table>
                    <tr>
                        <th></th>
                        <th>Male</th>
                        <th>Female</th>
                    </tr>
                    <tr>
                        <td>BMI Score</td>
                        <td>${bmi.toFixed(2)}</td>
                        <td>${bmi.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>BMI Category</td>
                        <td>${categoryMale}</td>
                        <td>${categoryFemale}</td>
                    </tr>
                </table>
            `;

            // Update BMI marker position
            const bmiMarker = document.getElementById('bmiMarker');
            const scaleWidth = document.querySelector('.scale').offsetWidth;
            const markerPosition = Math.min((bmi - 10) / 35 * scaleWidth, scaleWidth - 5); // Adjust marker position based on new scale
            bmiMarker.style.left = `${markerPosition}px`;
        });
    }

    // KG and LBS Converter
    const kgLbsForm = document.getElementById('kgLbsForm');
    if (kgLbsForm) {
        kgLbsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get input values
            const weightInput = parseFloat(document.getElementById('weightInput').value);
            const weightUnit = document.getElementById('weightUnitSelect').value;

            // Convert based on selected unit
            let convertedValue = '';
            if (weightUnit === 'kg') {
                convertedValue = (weightInput * 2.20462).toFixed(2) + ' lbs';
            } else if (weightUnit === 'lbs') {
                convertedValue = (weightInput * 0.453592).toFixed(2) + ' kg';
            } else {
                convertedValue = 'Please enter a value to convert.';
            }

            // Display results
            document.getElementById('kgLbsValue').textContent = convertedValue;
        });
    }

    // Metric and Imperial Converter
    const metricImperialForm = document.getElementById('metricImperialForm');
    const lengthUnitSelect = document.getElementById('lengthUnitSelect');
    const feetInchesInputs = document.getElementById('feetInchesInputs');

    if (metricImperialForm) {
        lengthUnitSelect.addEventListener('change', function() {
            if (lengthUnitSelect.value === 'feetInches') {
                feetInchesInputs.style.display = 'block';
            } else {
                feetInchesInputs.style.display = 'none';
            }
        });

        metricImperialForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get input values
            const lengthInput = parseFloat(document.getElementById('lengthInput').value);
            const lengthUnit = lengthUnitSelect.value;

            // Convert based on selected unit
            let convertedValue = '';
            if (lengthUnit === 'cm') {
                const totalInches = lengthInput * 0.393701;
                const feetValue = Math.floor(totalInches / 12);
                const inchesValue = (totalInches % 12).toFixed(2);
                convertedValue = `${feetValue} ft ${inchesValue} in`;
            } else if (lengthUnit === 'feetInches') {
                const feet = parseFloat(document.getElementById('feet').value);
                const inches = parseFloat(document.getElementById('inches').value);
                const totalCm = ((feet * 12) + inches) * 2.54;
                convertedValue = `${totalCm.toFixed(2)} cm`;
            } else {
                convertedValue = 'Please enter a value to convert.';
            }

            // Display results
            document.getElementById('metricImperialValue').textContent = convertedValue;
        });
    }

    // Function to get BMI category
    function getBMICategory(bmi, gender) {
        let category;
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'Healthy weight';
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'Overweight but not obese';
        } else if (bmi >= 30 && bmi <= 34.9) {
            category = 'Obese class I';
        } else if (bmi >= 35 && bmi <= 39.9) {
            category = 'Obese class II';
        } else {
            category = 'Obese class III';
        }

        return category;
    }
});