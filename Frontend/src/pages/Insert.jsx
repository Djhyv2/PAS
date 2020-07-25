import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Insert.css';
import Data from '../lib/data';
import BrotherForm from '../components/BrotherForm';

class Insert extends Component
{
    render()
    {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Add</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Add</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <BrotherForm
                        buttonText="Add"
                        callback={Data.addNew}
                    />
                </IonContent>
            </IonPage>
        );
    }
}
export default Insert;
