import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Company';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';

class CompanyDropdownInternal extends Component {
    constructor(props) {
        super(props);
        this.props.requestCompanies();
    }

    render() {
        return (
                    <Dropdown
                        style={{ width: '100%' }}
                        disabled={this.props.isLoading}
                        name="maptype"
                        mainButtonText={this.props.selectedCompany ? this.props.selectedCompany : 'Select Comapny'}
                        label="Company"
                        items={this.props.companies.map(opt => ({
                            text: opt.Name,
                            onClick: (e) => this.props.onClick(e, opt.CompanyCode),
                            key: opt.CompanyCode
                        }))}
                    />
        );
    }
}

const CompanyDropdown = connectTeamsComponent(CompanyDropdownInternal);

export default connect(
    state => state.company,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CompanyDropdown);