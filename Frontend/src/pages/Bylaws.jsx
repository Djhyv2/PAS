import React from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem,
} from '@ionic/react';
import './Bylaws.css';

const Bylaws = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Bylaws</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Bylaws</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonItem>Bylaws currently awaiting approval</IonItem>
        </IonContent>
    </IonPage>
);

export default Bylaws;
