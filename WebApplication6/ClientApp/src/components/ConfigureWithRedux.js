//import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';
//import { actionCreators } from '../store/Companies';
//import { Dropdown } from 'msteams-ui-components-react';
//const microsoftTeams = require('@microsoft/teams-js');

//class ConfigureWithRedux extends Component {
//    componentWillMount() {
//        this.props.requestCompanies();
//    }

//    handleCompnayClick(e) {

//        console.log(e.target.textContent);
//        this.props.selectCompany(e.target.textContent);
//        this.props.requestProductLines(e.target.textContent.substring(e.target.textContent.lastIndexOf("-") + 1));
//        this.props.selectProductLine('Select');
//    }
//    inTeams = () => {
//        try {
//            return window.self !== window.top;
//        } catch (e) {
//            return true;
//        }
//    }
//    handleProductLineClick(e) {
//        this.props.selectProductLine(e.target.textContent);
//        console.log(e.target.textContent);
//        var tabUrl = "https://webapplication6team.azurewebsites.net/home";
//        if (this.inTeams()) {
//            microsoftTeams.initialize();
//            microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {

//                microsoftTeams.settings.setSettings({
//                    entityId: "CompanyEntity",
//                    contentUrl: tabUrl,

//                });

//                saveEvent.notifySuccess();

//            });
//            microsoftTeams.settings.setValidityState(true);
//        }
//    }
//    render() {
//        if (this.props.isLoading) {
//            return (

//                <div className="center-box">

//                    <Dropdown
//                        name="maptype"

//                        mainButtonText={this.props.selectedCompany}
//                        label="Company"
//                        items={this.props.companies.map(opt => ({ text: opt.Name + '-' + opt.CompanyCode, onClick: (i) => this.handleCompnayClick(i) }))}
//                    />
//                    <div><br /></div>

//                    <Dropdown
//                        id="tabChoice"
//                        menuRightAlign
//                        label="Product Line"
//                        mainButtonText={this.props.selectedProductLine}
//                        items={this.props.productLines.map(opt => ({ text: opt.Name === '' ? opt.ProdUnitId : opt.Name, onClick: (i) => this.handleProductLineClick(i) }))}

//                    />
//                </div>


//            );
//        }
//        else {
//            return (
//                <div>
//                    <div className="center-box">
//                        Loading...
//                     </div>
//                </div>
//            );
//        }
//    }
//}



//export default connect(
//    state => state.companies,
//    dispatch => bindActionCreators(actionCreators, dispatch)
//)(ConfigureWithRedux);
