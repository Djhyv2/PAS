import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel,
} from '@ionic/react';
import './Update.css';
import Data from '../lib/data';
import BrotherForm from '../components/BrotherForm';

class Update extends Component
{
    constructor()
    {
        super();
        this.state = { brothers: [] };
    }

    async componentDidMount()
    {
        const brothers = await Data.getBrothers();
        this.setState({ brothers });
    }

    setValues(e)
    {
        console.log(e.target.value);
    }

    render()
    {
        const { brothers } = this.state;
        //eslint-disable-next-line jsx-a11y/control-has-associated-label
        const optionsList = brothers.map((brother) => (<option data-value={brother.id} value={brother.Name} />));
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
                        callback={Data.updateExisting}
                        additionalItemsTop={(
                            <IonItem>
                                <IonLabel position="stacked">Big Brother</IonLabel>
                                <input
                                    onChange={this.setValues}
                                    id="bigBrotherInput"
                                    list="bigBrotherList"
                                    required
                                />
                                <datalist id="bigBrotherList">
                                    {optionsList}
                                </datalist>
                            </IonItem>
                        )}
                    />
                </IonContent>
            </IonPage>
        );
    }
}
export default Update;
