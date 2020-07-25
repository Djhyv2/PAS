import React, { Component } from 'react';
import './BrotherForm.css';
import {
    IonInput, IonDatetime, IonLabel, IonItem, IonSelectOption, IonSelect, IonButton,
} from '@ionic/react';
import PropTypes from 'prop-types';
import Data from '../lib/data';

class BrotherFormComponent extends Component
{
    constructor()
    {
        super();
        this.state = { brothers: [] };
        this.submit = this.submit.bind(this);
    }

    async componentDidMount()
    {
        const brothers = await Data.getBrothers();
        this.setState({ brothers });
    }

    submit(e)
    {
        e.preventDefault();
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
        const status = document.getElementById('statusSelect').value;
        const values = {
            year, name, staffName, bigBrother, status,
        };
        const { callback } = this.props;
        callback(values);
    }

    render()
    {
        const currentYear = new Date().getFullYear();
        const { brothers } = this.state;
        //eslint-disable-next-line jsx-a11y/control-has-associated-label
        const optionsList = brothers.map((brother) => (<option data-value={brother.id} value={brother.Name} />));
        const { additionalItemsBottom, additionalItemsTop, buttonText } = this.props;
        return (
            <form onSubmit={this.submit}>
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
