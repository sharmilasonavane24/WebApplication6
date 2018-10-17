import soap from 'soap';
const requestProductionUnitType = 'REQUEST_PRODUCTIONLINE';
const receiveProductionUnitType = 'RECEIVE_PRODUCTIONLINE';
const initialState = { productionUnits: [], isLoading: false, companyCode: 'test', error: '' };
const url = `https://web-business-services-test.azurewebsites.net/TerbergBusinessServices.svc?wsdl`;

export const actionCreators = {

    requestProductionUnits: companyCode => async (dispatch, getState) => {
        if (companyCode === getState().productionUnit.companyCode) {
            return;
        }
        dispatch({ type: requestProductionUnitType, companyCode,error:'' });

        var productionUnits = [];
        var args = { companyCode: companyCode };
        if (companyCode !== '') {
            soap.createClient(url, (err, client) => {
                if (err) {
                    //SOAP Client Error
                    dispatch({ type: receiveProductionUnitType, productionUnits, companyCode, error: err.response.statusMessage });

                } else {
                    client.GetProductionLineByCompany(args,
                        (err, result) => {
                            if (err) {
                                dispatch({ type: receiveProductionUnitType, productionUnits, companyCode, error: err.response.statusMessage });
                            } else {
                                productionUnits = JSON.parse(result.GetProductionLineByCompanyResult);
                                if (productionUnits.length === 0) {
                                    dispatch({ type: receiveProductionUnitType, productionUnits, companyCode, error: 'Production line not found...' });
                                } else {
                                    dispatch({ type: receiveProductionUnitType, productionUnits, companyCode, error: '' });
                                }
                            }
                        }
                    )
                }
            });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case requestProductionUnitType:
            return {
                ...state,
                companyCode: action.companyCode,
                error: action.error,
                isLoading: true,

            };
        case receiveProductionUnitType:
            return {
                ...state,
                productionUnits: action.productionUnits,
                companyCode: action.companyCode,
                error: action.error,
                isLoading: false,
            };

        default:
            return {
                ...state,
            };

    }
};