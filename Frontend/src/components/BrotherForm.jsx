import React, { Component } from 'react';
import './BrotherForm.css';
import {
    IonInput, IonDatetime, IonLabel, IonItem, IonSelectOption, IonSelect, IonButton, IonToast,
} from '@ionic/react';
import PropTypes from 'prop-types';
import BrotherDropDown from './BrotherDropDown';

class BrotherFormComponent extends Component
{
    constructor()
    {
        super();
        this.submit = this.submit.bind(this);
        this.state = { message: null };
    }

    async submit(e)
    {
        e.preventDefault();
        const idElement = document.getElementById('editedUserIdInput');
        let id;
        if (idElement)
        {
            id = parseInt(idElement.value?.slice(0, 4), 10);
        }
        const year = parseInt(document.getElementById('yearSelect').value?.slice(0, 4), 10);
        let name = document.getElementById('nameInput').value;
        if ('' === name)
        {
            name = null;
        }
        let staffName = document.getElementById('staffNameInput').value;
        if ('' === staffName)
        {
            staffName = null;
        }
        const input = document.getElementById('bigBrotherInput');
        const option = document.querySelector(`option[value='${input.value}']`);
        let bigBrother = null;
        if (null != option)
        {
            bigBrother = parseInt(option.getAttribute('data-value'), 10);
        }
        if ('' !== input.value && null === bigBrother)
        {
            this.setState({ message: 'Invalid Big Brother' });
            return;
        }
        const status = document.getElementById('statusSelect').value;
        const values = {
            id, year, name, staffName, bigBrother, status,
        };
        const { callback } = this.props;
        const returnValue = await callback(values);
        if (null === returnValue)
        {
            this.setState({ message: 'Successful Operation' });
            document.getElementById('nameInput').value = null;
            document.getElementById('staffNameInput').value = null;
            document.getElementById('bigBrotherInput').value = null;
        }
        else
        {
            this.setState({ message: `Failed Operation: ${returnValue}` });
        }
    }

    render()
    {
        const currentYear = new Date().getFullYear();
        const { additionalItemsBottom, additionalItemsTop, buttonText } = this.props;
        const { message } = this.state;
        return (
            <form onSubmit={this.submit}>
                <IonToast isOpen={null !== message} message={message} position="top" onDidDismiss={() => this.setState({ message: null })} buttons={[{ text: 'Close', role: 'cancel' }]} />
                {additionalItemsTop}
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
                <BrotherDropDown id="bigBrotherInput" list="bigBrotherInputList" label="Big Brother" />
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
                {additionalItemsBottom}
                <IonButton class="ion-margin-top" expand="block" type="submit">{buttonText}</IonButton>
            </form>
        );
    }
}
BrotherFormComponent.propTypes = {
    additionalItemsBottom: PropTypes.element,
    additionalItemsTop: PropTypes.element,
    buttonText: PropTypes.string,
    callback: PropTypes.func,
};
BrotherFormComponent.defaultProps = {
    additionalItemsTop: '',
    additionalItemsBottom: '',
    buttonText: 'Submit',
    callback: () =>
    {},
};
export default BrotherFormComponent;
