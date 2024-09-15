const initialState = {
    attorneys: [],
    owners:[],
    law_firms:[],
    loading: false,
    error: null,
    statusMessage: "",
  };
  
  export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_FILTERS_REQUEST':
        return { ...state, loading: true, statusMessage: "Searching..." };
      case 'FETCH_FILTERS_SUCCESS':
        return { ...state, loading: false, attorneys: action.payload?.attorneys?.buckets, 
            owners:action.payload?.current_owners?.buckets, 
            law_firms:action.payload?.law_firms?.buckets, 
            statusMessage: `Found 1 FILTERS` };
      case 'FETCH_FILTERS_FAILURE':
        return { ...state, loading: false, error: action.payload, statusMessage: "Error Occurred" };
      default:
        return state;
    }
  };
  
  