import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamsComponentContext, ThemeStyle } from 'msteams-ui-components-react'
import { Layout } from './components/Layout';

const microsoftTeams = require('@microsoft/teams-js');

class App extends Component {
    state = {
        theme: ThemeStyle.Light,
        fontSize: 16,
    };
    constructor(props) {
        super(props);
        this.state = {
            theme: this.setTheme(this.getQueryVariable('theme')),
            fontSize: this.pageFontSize()
        };

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler((themeStr) => {
                var themeStyle = this.setTheme(themeStr);
                this.setState({ theme: themeStyle });
            });
        }
    }

    render() {
        return (
            <TeamsComponentContext
                fontSize={this.state.fontSize}
                theme={this.state.theme}>
                <Layout />
            </TeamsComponentContext>
        );
    }

    // Grabs the font size in pixels from the HTML element on your page.
    pageFontSize = () => {
        let sizeStr = window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size');
        sizeStr = sizeStr.replace('px', '');
        let fontSize = parseInt(sizeStr, 10);
        if (!fontSize) {
            fontSize = 16;
        }
        return fontSize;
    }

    // This is a simple method to check if your webpage is running inside of MS Teams.
    // This just checks to make sure that you are or are not iframed.
    inTeams = () => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    // Sets the correct theme type from the query string parameter.
    updateTheme = (themeStr) => {
        let theme;
        switch (themeStr) {
            case 'dark':
                theme = ThemeStyle.Dark;
                break;
            case 'contrast':
                theme = ThemeStyle.HighContrast;
                break;
            case 'default':
            default:
                theme = ThemeStyle.Light;
        }
        this.setState({ theme });
    }
    setTheme(themeStr) {
        let theme;
        switch (themeStr) {
            case 'dark':
                theme = ThemeStyle.Dark;
                break;
            case 'contrast':
                theme = ThemeStyle.HighContrast;
                break;
            case 'default':
            default:
                theme = ThemeStyle.Light;
        }
        return theme;
    }

    // Returns the value of a query variable.
    getQueryVariable = (variable) => {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (const varPairs of vars) {
            const pair = varPairs.split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
}
//const App = connectTeamsComponent(AppInternal);

export default connect()(App);