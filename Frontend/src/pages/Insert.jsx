import React from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Insert.css';

const Insert = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Insert</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Insert</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonContent>
    </IonPage>
);

export default Insert;
