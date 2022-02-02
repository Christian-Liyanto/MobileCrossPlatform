const calcBtn = document.querySelector('ion-button');
const heighInput = document.getElementById('height-input');
const weightInput = document.getElementById("weight-input");

const calcBMI = () =>{
    const enteredHeight = +heighInput.value / 100;
    const enteredWeight = +weightInput.value;

    const bmi = enteredWeight / (enteredHeight*enteredHeight);
    var category;
    if(bmi >= 30){
        category = "Obesitas";
    }
    else if(bmi >= 25 && bmi < 29.9){
        category = "Gemuk";
    }
    else if(bmi >= 18.5 && bmi < 24.9){
        category = "Normal";
    }
    else if(bmi < 18.5){
        category = "Kurus";
    }
    else{
        category = "Error!!";
    }
    
    console.log(bmi);
    console.log(category);
    document.getElementById('result').innerHTML = bmi;
    document.getElementById('resultType').innerHTML = category;
};

calcBtn.addEventListener('click', calcBMI);