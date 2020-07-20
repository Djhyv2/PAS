import React, { Component } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import './Tree.css';
import OrgChart from '../components/OrgChart';
import Data from '../lib/data';

class TreeComponent extends Component
{
    constructor()
    {
        super();
        this.state = { data: [] };
    }

    async componentDidMount()
    {
        const data = await Data.fetch();
        this.setState({ data });
    }

    render()
    {
        const { data } = this.state;
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Family Tree</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Family Tree</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <OrgChart nodes={data} />
                </IonContent>
            </IonPage>
        );
    }
}

export default TreeComponent;
