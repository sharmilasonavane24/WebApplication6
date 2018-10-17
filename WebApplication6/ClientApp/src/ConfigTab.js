import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectTeamsComponent, Panel, PanelBody} from 'msteams-ui-components-react';
import CompanyDropdown from './components/CompanyDropdown';
import ProductionUnitDropdown from './components/ProductionUnitDropdown';


const microsoftTeams = require('@microsoft/teams-js');

class ConfigTabInner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            companyCode: '',
            selectedProductionUnit: 'Select Production Unit...',
            productionUnitId:''
        };
        this.handleCompnayClick = this.handleCompnayClick.bind(this);
        this.handleProductionUnitClick = this.handleProductionUnitClick.bind(this);
    }

    handleCompnayClick(e, companyCode) {

        this.setState({
            companyName: e.target.textContent,
            companyCode: companyCode,
            selectedProductionUnit: 'Select Production Unit...',
            productionUnitId: ''
        });

    }

    inTeams = () => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    componentDidUpdate() {
        if (this.inTeams()) {
            if (this.state.companyCode !== '' && this.state.productionUnitId !== '') {
                microsoftTeams.settings.setValidityState(true);
            }
            else {
                microsoftTeams.settings.setValidityState(false);
            }
        }
    }

    handleProductionUnitClick(e, productionUnitId) {
        this.setState({
            selectedProductionUnit: e.target.textContent,
            productionUnitId: productionUnitId
        });
        var tabUrl = "https://e0739c8f.ngrok.io/home/?theme={theme}&companycode="+this.state.companyCode+"&productionunitid=" + productionUnitId;
       
        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
                microsoftTeams.settings.setSettings({
                    entityId: "CompanyEntity",
                    contentUrl: tabUrl,

                });

                saveEvent.notifySuccess();

            });
         
        }
    }

    render() {
        const { context } = this.props;
        const { rem } = context;

        const styles = {
            panelStyle:
            {
                height: window.innerHeight,
                border: 0,
                padding: 0,
                margin: 0
            },
            button: { marginRight: rem(0.5) },
        };


 
        return (

            <Panel className="rootPanel" style={styles.panelStyle}>
                <PanelBody>
                    <CompanyDropdown onClick={this.handleCompnayClick} selectedCompany={this.state.companyName} />
                    <ProductionUnitDropdown selectedCompanyCode={this.state.companyCode} selectedProductionUnit={this.state.selectedProductionUnit} onClick={this.handleProductionUnitClick} />
                </PanelBody>
            </Panel>

        );

    }
}
const ConfigTab = connectTeamsComponent(ConfigTabInner);

export default connect()(ConfigTab);