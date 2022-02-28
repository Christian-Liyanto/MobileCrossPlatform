import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonCol, IonCardContent, IonGrid, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemGroup, IonLabel, IonRouterOutlet, IonRow, IonTitle, IonToolbar, setupIonicReact, IonCard, IonAlert, IonBackButton, IonButtons } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { useRef, useState } from 'react';

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
import '../theme/variables.css';

import InputControl from '../components/InputControl';
import BmiControls from '../components/BmiControls';
import BmiResult from '../components/BmiResult';

setupIonicReact();

const App: React.FC = () => {
  const [ calcUnits, setCalcsUnits ] = useState<"cmkg"|"ftlbs">("cmkg");
  const [ calculatedBMI, setCalcBMI ] = useState<number>();
  const [ categoryBMI, setCategoryBMI ] = useState<string>();
  const [ error, setError ] = useState<string>();
  const hInputRef = useRef<HTMLIonInputElement>(null);
  const wInputRef = useRef<HTMLIonInputElement>(null);
  const result = useRef<HTMLIonRowElement>(null);

  const calcBMI = () => {
    const enteredW = wInputRef.current!.value;
    const enteredH = hInputRef.current!.value;
    var cmkgftlbs;

    if(!enteredH || !enteredW || +enteredH <= 0 || +enteredW <= 0){
      if(result != null){
        result.current?.setAttribute("hidden", "true");
      }

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

    if(category == ""){
      if(result){
        result.current?.setAttribute("hidden", "true");
      }
      setError("Please enter a valid (non-negative) input number!!");
    }
    else{
      if(result){
        result.current?.removeAttribute("hidden");
      }
    }

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
          <IonButtons slot="start">
              <IonBackButton defaultHref="home"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeSm="8" offsetSm="2" sizeMd="6" offsetMd="3">
              <IonGrid className="ion-no-padding">
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
                {calculatedBMI && categoryBMI && <BmiResult result={result} onCalculated={calculatedBMI} onCategory={categoryBMI}/>}
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonApp>
    </>
  )
};

export default App;
