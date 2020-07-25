import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
    addOutline, listOutline, leafOutline, calendarOutline, pencilOutline,
} from 'ionicons/icons';
import GenerationTree from './pages/GenerationTree';
import YearTree from './pages/YearTree';
import Insert from './pages/Insert';
import Bylaws from './pages/Bylaws';
import Update from './pages/Update';

/*Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/*Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/*Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/*Theme variables */
import './theme/variables.css';

const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/GenerationTree" component={GenerationTree} exact />
                    <Route path="/YearTree" component={YearTree} exact />
                    <Route path="/Insert" component={Insert} exact />
                    <Route path="/Bylaws" component={Bylaws} exact />
                    <Route path="/Update" component={Update} exact />
                    <Route path="/*" render={() => <Redirect to="/YearTree" />} exact />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="Tree By Year" href="/YearTree">
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>Tree By Year</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Tree By Generation" href="/GenerationTree">
                        <IonIcon icon={leafOutline} />
                        <IonLabel>Tree By Generation</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Bylaws" href="/Bylaws">
                        <IonIcon icon={listOutline} />
                        <IonLabel>Bylaws</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Insert" href="/Insert">
                        <IonIcon icon={addOutline} />
                        <IonLabel>Add</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Update" href="/Update">
                        <IonIcon icon={pencilOutline} />
                        <IonLabel>Update</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
