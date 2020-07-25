import React, { Component } from 'react';
import './BrotherDropDown.css';
import {
    IonLabel, IonItem,
} from '@ionic/react';
import PropTypes from 'prop-types';
import Data from '../lib/data';

class BrotherDropDownComponent extends Component
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

    render()
    {
        const { brothers } = this.state;
        //eslint-disable-next-line jsx-a11y/control-has-associated-label
        const optionsList = brothers.map((brother) => (<option data-value={brother.id} value={brother.Name} />));
        const {
            label, id, list, onChange,
        } = this.props;
        return (
            <IonItem>
                <IonLabel position="stacked">{label}</IonLabel>
                <input
                    className="bigBrotherInput"
                    id={id}
                    list={list}
                    onChange={onChange}
                    required
                />
                <datalist id={list}>
                    {optionsList}
                </datalist>
            </IonItem>
        );
    }
}
BrotherDropDownComponent.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};
BrotherDropDownComponent.defaultProps = {
    label: '',
    onChange: () =>
    {},
};
export default BrotherDropDownComponent;
