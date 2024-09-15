const initialState = {
    data: [],
    loading: false,
    error: null,
    statusMessage: "",
  };
  
  export const trademarkReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TRADEMARKS_REQUEST':
        return { ...state, loading: true, statusMessage: "Searching..." };
      case 'FETCH_TRADEMARKS_SUCCESS':
        return { ...state, loading: false, data: action.payload, statusMessage: `Found 10 trademarks` };
      case 'FETCH_TRADEMARKS_FAILURE':
        return { ...state, loading: false, error: action.payload, statusMessage: "Error Occurred" };
      default:
        return state;
    }
  };
  
  