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
import { ellipse, square, triangle } from 'ionicons/icons';
import Tree from './pages/Tree';
import Insert from './pages/Insert';
import Bylaws from './pages/Bylaws';

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
                    <Route path="/Tree" component={Tree} exact />
                    <Route path="/Insert" component={Insert} exact />
                    <Route path="/Bylaws" component={Bylaws} />
                    <Route path="/*" render={() => <Redirect to="/Tree" />} exact />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="Tree" href="/Tree">
                        <IonIcon icon={triangle} />
                        <IonLabel>Family Tree</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Bylaws" href="/Bylaws">
                        <IonIcon icon={square} />
                        <IonLabel>Bylaws</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Insert" href="/Insert">
                        <IonIcon icon={ellipse} />
                        <IonLabel>Insert</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
