import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonCheckbox, IonLabel,
} from '@ionic/react';
import './Insert.css';
import Data from '../lib/data';
import BrotherForm from '../components/BrotherForm';

class Insert extends Component
{
    constructor()
    {
        super();
        this.state = { allowIncomplete: false };
    }

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
                        additionalItemsBottom={(
                            <IonItem>
                                <IonCheckbox
                                    slot="start"
                                    onIonChange={() =>
                                    {
                                        let { allowIncomplete } = this.state;
                                        allowIncomplete = !allowIncomplete;
                                        this.setState({ allowIncomplete });
                                        if (allowIncomplete)
                                        {
                                            document.querySelectorAll('input').forEach((e) =>
                                            {
                                                e.removeAttribute('required');
                                            });
                                            document.getElementById('yearSelect').value = null;
                                        }
                                        else
                                        {
                                            document.getElementById('yearSelect').setAttribute('required', 'required');
                                            document.getElementById('nameInput').setAttribute('required', 'required');
                                            document.getElementById('staffNameInput').setAttribute('required', 'required');
                                            document.getElementById('bigBrotherInput').setAttribute('required', 'required');
                                            document.getElementById('statusSelect').setAttribute('required', 'required');
                                        }
                                    }}
                                />
                                <IonLabel>Check if adding a brother with incomplete information</IonLabel>
                            </IonItem>
                        )}
                    />
                </IonContent>
            </IonPage>
        );
    }
}
export default Insert;
