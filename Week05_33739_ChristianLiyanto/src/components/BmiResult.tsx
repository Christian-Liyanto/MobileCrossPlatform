import { IonButton, IonCol, IonRow, IonIcon, IonCard, IonCardContent } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React, { RefObject } from "react";
import './BmiResult.css';

const BmiResult: React.FC <{result: RefObject<HTMLIonRowElement>; onCalculated: number; onCategory: string}> = props =>{
    var category;

    if(props.onCategory == "Normal"){
        category = "success";
    }
    else if(props.onCategory =="Gemuk" || props.onCategory == "Kurus"){
        category = "warning";
    }
    else{
        category = "danger";
    }

    return(
        <IonRow ref={props.result}>
            <IonCol>
                <IonCard id="result" className={category}>
                    <IonCardContent className="ion-text-center">
                    <h2>{props.onCalculated}</h2>
                    </IonCardContent>
                    <IonCardContent className="ion-text-center">
                    <h1>{props.onCategory}</h1>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};

export default BmiResult;