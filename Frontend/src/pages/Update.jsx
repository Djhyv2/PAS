import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Update.css';
import Data from '../lib/data';
import BrotherForm from '../components/BrotherForm';
import BrotherDropDown from '../components/BrotherDropDown';

class Update extends Component
{
    static async setValues()
    {
        const input = document.getElementById('editedUserIdInput');
        const option = document.querySelector(`option[value='${input.value}']`);
        let id = null;
        if (null != option)
        {
            id = parseInt(option.getAttribute('data-value'), 10);
        }
        else
        {
            return;
        }
        let brotherData = await Data.getBrother(id);
        if (0 === brotherData.length)
        {
            return;
        }
        [brotherData] = brotherData;
        document.getElementById('nameInput').value = brotherData?.name;
        document.getElementById('staffNameInput').value = brotherData?.staffName;
        document.getElementById('yearSelect').value = brotherData?.year;
        document.getElementById('statusSelect').value = brotherData?.status;
        if (null != brotherData.bigBrother)
        {
            const bigBrotherOption = document.querySelector(`option[data-value='${brotherData.bigBrother}']`);
            document.getElementById('bigBrotherInput').value = bigBrotherOption.value;
        }
        else
        {
            document.getElementById('bigBrotherInput').value = null;
        }
    }

    render()
    {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Update</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Update</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <BrotherForm
                        buttonText="Update"
                        callback={Data.updateExisting}
                        additionalItemsTop={(
                            <BrotherDropDown id="editedUserIdInput" list="editedUserList" label="Brother to Edit" onChange={Update.setValues} />
                        )}
                    />
                </IonContent>
            </IonPage>
        );
    }
}
export default Update;
