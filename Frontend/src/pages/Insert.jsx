/*eslint-disable react/jsx-indent-props*/
import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonDatetime, IonLabel, IonItem, IonSelectOption, IonSelect, IonButton,
} from '@ionic/react';
import './Insert.css';
import Data from '../lib/data';

class Insert extends Component
{
    static insertBrother(e)
    {
        e.preventDefault();
        const year = parseInt(document.querySelector('#yearSelect').value.slice(0, 4), 10);
        const name = document.querySelector('#nameInput').value;
        const staffName = document.querySelector('#staffNameInput').value;
        const input = document.getElementById('bigBrotherInput');
        const option = document.querySelector(`option[value='${input.value}']`);
        let bigBrother;
        if (null != option)
        {
            bigBrother = parseInt(option.getAttribute('data-value'), 10);
        }
        const status = document.querySelector('#statusSelect').value;
        Data.addNew({
            year, name, staffName, bigBrother, status,
        });
    }

    constructor()
    {
        super();
        this.state = { bigBrothers: [] };
    }

    async componentDidMount()
    {
        const bigBrothers = await Data.getBrothers();
        this.setState({ bigBrothers });
    }

    render()
    {
        const currentYear = new Date().getFullYear();
        const { bigBrothers } = this.state;
        //eslint-disable-next-line jsx-a11y/control-has-associated-label
        const optionsList = bigBrothers.map((brother) => (<option data-value={brother.id} value={brother.Name} />));
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
                    <form onSubmit={Insert.insertBrother}>
                        <IonItem>
                            <IonLabel position="floating">Year</IonLabel>
                            <IonDatetime
                                id="yearSelect"
                                name="year"
                                displayFormat="YYYY"
                                value={currentYear}
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Name</IonLabel>
                            <IonInput
                                id="nameInput"
                                name="name"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Staff Name</IonLabel>
                            <IonInput
                                id="staffNameInput"
                                name="staffName"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Big Brother</IonLabel>
                            <input
                                id="bigBrotherInput"
                                list="bigBrotherList"
                                required
                            />
                            <datalist id="bigBrotherList">
                                {optionsList}
                            </datalist>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Status</IonLabel>
                            <IonSelect
                                id="statusSelect"
                                interface="popover"
                                value="Brother"
                                required
                            >
                                <IonSelectOption value="Brother" default>Brother</IonSelectOption>
                                <IonSelectOption value="Elder">Elder</IonSelectOption>
                                <IonSelectOption value="Founder">Founder</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonButton class="ion-margin-top" expand="block" type="submit">Add</IonButton>
                    </form>
                </IonContent>
            </IonPage>
        );
    }
}
export default Insert;
