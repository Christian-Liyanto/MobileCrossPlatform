import { IonButton, IonCol, IonRow, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

const BmrControls: React.FC <{onCalculate: () => void; onReset: () =>void}> = props =>{
    return(
        <IonRow>
            <IonCol className="ion-text-left">
                <IonButton onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
                <IonButton onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default BmrControls;