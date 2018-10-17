import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import ConfigTab from '../ConfigTab';
import Home from './Home';
import { Surface } from 'msteams-ui-components-react';

export class Layout extends Component {
    render() {
        return (
            <Surface>
                <div>
                    <Route exact path='/home' component={Home} />
                    <Route path='/configtab' component={ConfigTab} />
                </div>
            </Surface>
        );
    }
}
export default connect()(Layout);