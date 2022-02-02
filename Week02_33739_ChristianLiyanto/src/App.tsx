import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonCol, IonCardContent, IonGrid, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemGroup, IonLabel, IonRouterOutlet, IonRow, IonTitle, IonToolbar, setupIonicReact, IonCard } from '@ionic/react';
import { barChartOutline, barChartSharp, scanOutline, scanSharp, bookmarkOutline, calculatorOutline, calculatorSharp, terminalOutline, terminalSharp, personCircleOutline, personCircleSharp, peopleOutline, peopleSharp, personAddOutline, personAddSharp, fileTrayFullOutline,fileTrayFullSharp, pricetagsSharp, pricetagsOutline, logInSharp, logInOutline, logOutSharp, logOutOutline, documentTextSharp, documentTextOutline, arrowDownCircleSharp, arrowDownCircleOutline, arrowUpCircleSharp, arrowUpCircleOutline, infiniteSharp, infiniteOutline, refreshOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
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
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [ calculatedBMI, setCalcBMI ] = useState<number>();
  const [ categoryBMI, setCategoryBMI ] = useState<string>();
  const hInputRef = useRef<HTMLIonInputElement>(null);
  const wInputRef = useRef<HTMLIonInputElement>(null);

  const calcBMI = () => {
    const enteredW = wInputRef.current!.value;
    const enteredH = hInputRef.current!.value;

    if(!enteredH || !enteredW) return;

    const bmi = +enteredW/((+enteredH/100)*(+enteredH/100));

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

  return(
    <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Calculator</IonTitle>
        
      </IonToolbar>
    </IonHeader>

    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Tinggi Badan(cm)</IonLabel>
            <IonInput ref={hInputRef}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Berat Badan(kg)</IonLabel>
            <IonInput ref={wInputRef}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-left">
          <IonButton onClick={calcBMI}>
            <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
            Calculate
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-right">
          <IonButton onClick={resetInput}>
            <IonIcon slot="start" icon={refreshOutline}></IonIcon>
            Reset
          </IonButton>
        </IonCol>
      </IonRow>
      {calculatedBMI && categoryBMI && (<IonRow>
        <IonCol>
          <IonCard>
            <IonCardContent className="ion-text-center">
              <h2>{calculatedBMI}</h2>
            </IonCardContent>
            <IonCardContent className="ion-text-center">
              <h1>{categoryBMI}</h1>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>)}
    </IonGrid>
  </IonApp>
  )
};

export default App;
