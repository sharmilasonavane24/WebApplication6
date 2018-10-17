import soap from 'soap';
const requestCompaniesType = 'REQUEST_COMPANIES';
const receiveCompaniesType = 'RECEIVE_COMPANIES';

const initialState = {
    companies: [],
    isLoading: false,
    error:''
};

const url = `https://web-business-services-test.azurewebsites.net/TerbergBusinessServices.svc?wsdl`;

export const actionCreators = {
    requestCompanies: () => async (dispatch) => {
        dispatch({ type: requestCompaniesType });

        var companies = [];
       
        soap.createClient(url, (err, client) => {
            if (err) {
                dispatch({ type: receiveCompaniesType, companies, error: err.response.statusMessage });

            } else {
                client.GetCompanies(
                    (err, result) => {
                        if (err) {
                            dispatch({ type: receiveCompaniesType, companies, error: err.response.statusMessage });

                        } else {
                            companies = JSON.parse(result.GetCompaniesResult);
                            dispatch({ type: receiveCompaniesType, companies, error: '' });
                        }
                    }
                )
            }
        });       
    }
};



export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case requestCompaniesType:
            return {
                ...state,
                error: action.error,
                isLoading: true
            };
        case receiveCompaniesType:
            return {
                ...state,
                companies: action.companies,
                error: action.error,
                isLoading: false
            };
        default:
            return {
                ...state,
            };
             
    } 
};