const regulations = {
    "2019": {
        "IT": {
            "1": 20,
            "2": 22,
            "3": 21,
            "4": 25,
            "5": 22,
            "6": 22,
            "7": 23,
            "8": 12
        },
        
    },
    
}


// Select the regulation and course elements
const regulationSelect = document.getElementById('regulation');
const courseSelect = document.getElementById('course');

// Populate the course options when the regulation changes
regulationSelect.addEventListener('change', function() {
    const selectedRegulation = this.value;
    courseSelect.innerHTML = ''; 
    for (const course in regulations[selectedRegulation]) {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    }
});

// Manually trigger the change event to populate courses for the initial selected regulation
regulationSelect.dispatchEvent(new Event('change'));

let semesterCount = 1;

function addSemester() {
    semesterCount++;
    if (semesterCount <= 8) {
        const semesterDiv = document.getElementById("additional-semesters");
        const newInput = document.createElement("div");
        newInput.innerHTML = `
            <label for="semester${semesterCount}">Semester ${semesterCount} GPA:</label>
            <input type="number" id="semester${semesterCount}" step="0.01" min="0" max="10" required>
        `;
        semesterDiv.appendChild(newInput);
    }
}

function removeSemester() {
    if (semesterCount > 1) {
        const semesterDiv = document.getElementById("additional-semesters");
        semesterDiv.removeChild(semesterDiv.lastChild);
        semesterCount--;
    }
}

function calculateCGPA() {
    let weightedGPA = 0;
    let totalCredits = 0;
    const selectedRegulation = document.getElementById('regulation').value;
    const selectedCourse = document.getElementById('course').value;

    for (let i = 1; i <= semesterCount; i++) {
        const semesterGPA = parseFloat(document.getElementById(`semester${i}`).value);
        if (isNaN(semesterGPA)) {
            alert(`Please enter a valid GPA for Semester ${i}`);
            return;  
        }
        else if(semesterGPA>10 || semesterGPA<0){
            alert(`Please enter a value of range 0-10 for Semester ${i}`);
            return;
        }
        const semesterCredits = regulations[selectedRegulation][selectedCourse][i];
        weightedGPA += semesterGPA * semesterCredits;
        totalCredits += semesterCredits;
    }

    const cgpa = (weightedGPA / totalCredits).toFixed(2);
    const cgpaElement = document.getElementById("cgpa");
    cgpaElement.textContent = `${cgpa}`;
    // Make the CGPA visible
    cgpaElement.style.opacity = "1";
    cgpaElement.style.transform = "translateY(0)";

    // Scroll to the CGPA results section
    cgpaElement.scrollIntoView({ behavior: 'smooth' });
}