//import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Dropdown } from 'msteams-ui-components-react';
//import './configure.css';
//import soap from 'soap';
//const microsoftTeams = require('@microsoft/teams-js');


//export class Configure extends Component {
//    url = 'https://web-business-services-test.azurewebsites.net/TerbergBusinessServices.svc?wsdl';
   
//    constructor(props) {
//        super(props);

//        this.state = {
//            isCompanyLoaded: false,
//            isProductLineLoaded: false,
//            selectedCompany: "Select",
//            selectedProductLine: "Select",
//            companies: [{ "Name": "Loading", "CompanyCode": "..." }],
//            productLines: [{ "Name": "Select", "ProdUnitId": "Select" }],
//        };



//    }

//    inTeams = () => {
//        try {
//            return window.self !== window.top;
//        } catch (e) {
//            return true;
//        }
//    }
//    componentWillMount() {

//        this.GetCompanies();

//    }

//    GetCompanies() {
//        try {
//            soap.createClient(this.url, (err, client) => {
//                client.GetCompanies(
//                    (err, result) => {
//                        if (err) {
//                            this.setState({
//                                isCompanyLoaded: false
//                            });
//                            throw err;
//                        }
//                        this.setState({
//                            companies: JSON.parse(result.GetCompaniesResult),
//                            isCompanyLoaded: true
//                        });

//                    }
//                )
//            });
//        } catch (err) {
//            throw new Error("An error has occured in Configuration component!");
//        }



//    }
//    GetProductLines(companycode) {

//        try {
//            var args = { companyCode: companycode };
//            soap.createClient(this.url, (err, client) => {
//                client.GetProductionLineByCompany(args,
//                    (err, result) => {
//                        if (err) {
//                            this.setState({
//                                isProductLineLoaded: false,
//                                selectedProductLine: "Select"

//                            });
//                            throw err;
//                        }

//                        this.setState({
//                            productLines: JSON.parse(result.GetProductionLineByCompanyResult).length === 0 ? [{ "Name": "Select", "ProdUnitId": "Select" }] : JSON.parse(result.GetProductionLineByCompanyResult),
//                            isProductLineLoaded: true,
//                            selectedProductLine: "Select"
//                        });
//                    }
//                )
//            });
//        } catch (err) {
//            throw new Error("An error has occured in Configuration component!");
//        }

//    }


//    handleCompnayClick(e) {

//        this.setState({
//            selectedCompany: e.target.textContent

//        });
//        this.GetProductLines(e.target.textContent.substring(e.target.textContent.indexOf("-") + 1));

//    }

//    handleProductLineClick(e) {
//        this.setState({
//            selectedProductLine: e.target.textContent

//        });
//        console.log("from event=" + e.target.textContent);
//        console.log("from State=" + this.state.selectedCompany);
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
//        if (!this.state.isCompanyLoaded) {
//            return (
//                <div className="center-box">
//                    <img src={require('../images/Loading_icon.gif')} alt="Loading..." />
//                </div>
//            );
//        }
//        else {
//            return (
//                <div className="center-box">

//                    <Dropdown
//                        name="maptype"
//                        menuRightAlign
//                        mainButtonText={this.state.selectedCompany}
//                        label="Company"
//                        items={this.state.companies.map(opt => ({ text: opt.Name + '-' + opt.CompanyCode, onClick: (i) => this.handleCompnayClick(i) }))}
//                    />
//                    <div><br /></div>
//                    <Dropdown
//                        id="tabChoice"
//                        menuRightAlign
//                        label="Product Line"
//                        mainButtonText={this.state.selectedProductLine}
//                        items={this.state.productLines.map(opt => ({ text: opt.Name, onClick: (i) => this.handleProductLineClick(i) }))}

//                    />

//                </div>
//            );
//        }
//    }


//}

//export default connect()(Configure);