import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/ProductionUnit';
import { Dropdown, connectTeamsComponent } from 'msteams-ui-components-react';
import { MSTeamsIconType, MSTeamsIconWeight, MSTeamsIcon } from 'msteams-ui-icons-react';

class ProductionUnitDropdownInternal extends Component {
    constructor(props) {
        super(props);
        this.props.requestProductionUnits(this.props.selectedCompanyCode);
    }

    shouldComponentUpdate(nextProps) {
        nextProps.requestProductionUnits(nextProps.selectedCompanyCode);
        return true;
    }

    render() {
        if (this.props.error === '') {

            return (
                <div>
                    <div>{this.props.error}</div>
                    <Dropdown
                        style={{ width: '100%' }}
                        name="maptype"
                        disabled={this.props.isLoading}
                        mainButtonText={this.props.selectedProductionUnit}
                        label="Production Unit"
                        items={this.props.productionUnits.map(opt => ({ text: opt.Name === '' ? opt.ProdUnitId : opt.Name, onClick: (i) => this.props.onClick(i, opt.ProdUnitId) }))}
                    />
                </div>
            );
        } else {
            return (
                <div> <MSTeamsIcon
                    tabIndex={0}
                    iconWeight={MSTeamsIconWeight.Regular}
                    iconType={MSTeamsIconType.Warning} /> {this.props.error}</div>
            );
        }
    }
}
const ProductionUnitDropdown = connectTeamsComponent(ProductionUnitDropdownInternal);

export default connect(
    state => state.productionUnit,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProductionUnitDropdown);
