import { IonButton, IonCol, IonRow, IonIcon, IonCard, IonCardContent } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

const BmiResult: React.FC <{onCalculated: number; onCategory: string}> = props =>{
    return(
        <IonRow>
            <IonCol>
            <IonCard>
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