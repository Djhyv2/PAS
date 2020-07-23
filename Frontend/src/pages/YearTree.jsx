import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './YearTree.css';
import OrgChart from '../components/OrgChart';
import Data from '../lib/data';

class YearTreeComponent extends Component
{
    constructor()
    {
        super();
        this.state = { data: [] };
    }

    async componentDidMount()
    {
        const data = await Data.fetchByYear();
        this.setState({ data });
    }

    render()
    {
        const { data } = this.state;
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Family Tree By Year</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Family Tree By Year</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <OrgChart nodes={data} />
                </IonContent>
            </IonPage>
        );
    }
}

export default YearTreeComponent;
