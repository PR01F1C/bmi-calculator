document.addEventListener('DOMContentLoaded', function() {
    // BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const heightUnit = document.getElementById('heightUnit').value;
            const weightUnit = document.getElementById('weightUnit').value;

            let heightInMeters = heightUnit === 'inches' ? height * 0.0254 : height / 100;
            let weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

            const bmi = weightInKg / (heightInMeters * heightInMeters);
            const categoryMale = getBMICategory(bmi, 'male');
            const categoryFemale = getBMICategory(bmi, 'female');

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

            const bmiMarker = document.getElementById('bmiMarker');
            const scaleWidth = document.querySelector('.scale').offsetWidth;
            const markerPosition = Math.min((bmi - 10) / 35 * scaleWidth, scaleWidth - 5);
            bmiMarker.style.left = `${markerPosition}px`;
        });
    }

    // KG and LBS Converter
    const kgLbsForm = document.getElementById('kgLbsForm');
    if (kgLbsForm) {
        kgLbsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const weightInput = parseFloat(document.getElementById('weightInput').value);
            const weightUnit = document.getElementById('weightUnitSelect').value;

            const convertedValue = weightUnit === 'kg' 
                ? `${(weightInput * 2.20462).toFixed(2)} lbs` 
                : `${(weightInput * 0.453592).toFixed(2)} kg`;

            document.getElementById('kgLbsValue').textContent = convertedValue;
            sendConversionData('Weight', `${weightInput} ${weightUnit}`, convertedValue);
        });
    }

    // Metric and Imperial Converter
    const metricImperialForm = document.getElementById('metricImperialForm');
    const lengthUnitSelect = document.getElementById('lengthUnitSelect');
    const feetInchesInputs = document.getElementById('feetInchesInputs');
    const lengthInputContainer = document.getElementById('lengthInputContainer');
    const lengthInput = document.getElementById('lengthInput');
    const feetInput = document.getElementById('feet');
    const inchesInput = document.getElementById('inches');

    if (metricImperialForm) {
        lengthUnitSelect.addEventListener('change', function() {
            if (lengthUnitSelect.value === 'feetInches') {
                lengthInputContainer.style.display = 'none';
                feetInchesInputs.style.display = 'block';
            } else {
                lengthInputContainer.style.display = 'block';
                feetInchesInputs.style.display = 'none';
            }
        });

        metricImperialForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let convertedValue = '';
            if (lengthUnitSelect.value === 'cm') {
                const lengthCm = parseFloat(lengthInput.value);
                convertedValue = isNaN(lengthCm) ? 'Please enter a valid number' : `${(lengthCm * 0.393701).toFixed(2)} ft`;
            } else if (lengthUnitSelect.value === 'feetInches') {
                const feet = parseFloat(feetInput.value);
                const inches = parseFloat(inchesInput.value);
                if (isNaN(feet) || isNaN(inches)) {
                    convertedValue = 'Please enter valid numbers for feet and inches';
                } else {
                    const totalCm = ((feet * 12) + inches) * 2.54;
                    convertedValue = `${totalCm.toFixed(2)} cm`;
                }
            } else {
                convertedValue = 'Please enter a value to convert.';
            }

            document.getElementById('metricImperialValue').textContent = convertedValue;
            sendConversionData('Length', lengthUnitSelect.value === 'cm' ? `${lengthInput.value} cm` : `${feetInput.value} ft ${inchesInput.value} in`, convertedValue);
        });
    }

    // Function to get BMI category
    function getBMICategory(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Healthy weight';
        if (bmi < 30) return 'Overweight but not obese';
        if (bmi < 35) return 'Obese class I';
        if (bmi < 40) return 'Obese class II';
        return 'Obese class III';
    }

    // Function to send conversion data to the backend
    async function sendConversionData(type, input, output) {
        const response = await fetch('http://localhost:5000/api/conversions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, input, output }),
        });
        const data = await response.json();
        console.log(data);
    }
});