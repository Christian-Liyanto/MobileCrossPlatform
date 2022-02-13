import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonCol, IonCardContent, IonGrid, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemGroup, IonLabel, IonRouterOutlet, IonRow, IonTitle, IonToolbar, setupIonicReact, IonCard, IonAlert } from '@ionic/react';
import { barChartOutline, barChartSharp, scanOutline, scanSharp, bookmarkOutline, calculatorOutline, calculatorSharp, terminalOutline, terminalSharp, personCircleOutline, personCircleSharp, peopleOutline, peopleSharp, personAddOutline, personAddSharp, fileTrayFullOutline,fileTrayFullSharp, pricetagsSharp, pricetagsOutline, logInSharp, logInOutline, logOutSharp, logOutOutline, documentTextSharp, documentTextOutline, arrowDownCircleSharp, arrowDownCircleOutline, arrowUpCircleSharp, arrowUpCircleOutline, infiniteSharp, infiniteOutline, refreshOutline, text } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { useRef, useState } from 'react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { clear } from 'console';
import InputControl from './components/InputControl';

setupIonicReact();

const App: React.FC = () => {
  const [ calcUnits, setCalcsUnits ] = useState<"cmkg"|"ftlbs">("cmkg");
  const [ calculatedBMI, setCalcBMI ] = useState<number>();
  const [ categoryBMI, setCategoryBMI ] = useState<string>();
  const [ error, setError ] = useState<string>();
  const hInputRef = useRef<HTMLIonInputElement>(null);
  const wInputRef = useRef<HTMLIonInputElement>(null);

  const calcBMI = () => {
    const enteredW = wInputRef.current!.value;
    const enteredH = hInputRef.current!.value;
    var cmkgftlbs;

    if(!enteredH || !enteredW || +enteredH <= 0 || +enteredW <= 0){
      setError("Please enter a valid (non-negative) input number!!");
      return;
    }
    
    if(calcUnits == "cmkg")
      cmkgftlbs = +enteredW/((+enteredH/100)*(+enteredH/100));
    else{
      var ftTocm = +enteredH/0.0328;
      var lbstokg = +enteredW/2.2;      
      
      cmkgftlbs = +lbstokg/((+ftTocm/100)*(+ftTocm/100));
    }

    const bmi = cmkgftlbs;

    console.log(bmi);
    setCalcBMI(bmi);
    
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
    setCategoryBMI(category);
  }

  const resetInput = () => {
    wInputRef.current!.value = "";
    hInputRef.current!.value = "";
  }

  const selectCalcUnitHandler = (selectedValue: "cmkg"|"ftlbs") => {
    setCalcsUnits(selectedValue) ;
  }

  return(
    <>
      <IonAlert 
        isOpen={!!error}
        message={error}
        buttons={[{text: 'Okay', handler: () => {setError("")}}]}
      />

      <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
          
        </IonToolbar>
      </IonHeader>

      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Tinggi Badan({calcUnits === "cmkg"?"cm":"feet"})</IonLabel>
              <IonInput ref={hInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Berat Badan({calcUnits === "cmkg"?"kg":"lbs"})</IonLabel>
              <IonInput ref={wInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calcBMI} onReset={resetInput}/>
        {calculatedBMI && categoryBMI && <BmiResult onCalculated={calculatedBMI} onCategory={categoryBMI}/>}
      </IonGrid>
    </IonApp>
    </>
  )
};

export default App;
