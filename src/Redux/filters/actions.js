import axios from 'axios';

export const fetchFilters = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TRADEMARKS_REQUEST' });
  const body ={
        "input_query": "check",
        "input_query_type":"",
        "sort_by": "default",
        "status": [],
        "exact_match": false,
        "date_query": false,
        "owners": [],
        "attorneys": [],
        "law_firms": [],
        "mark_description_description": [],
        "classes": [],
        "page": 1,
        "rows": 10,
        "sort_order": "desc",
        "states":[],
        "counties":[]
  }
  try {
    const response = await axios.post('https://vit-tm-task.api.trademarkia.app/api/v3/us', body,
        {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    console.log(response.data.body.aggregations)
    dispatch({ type: 'FETCH_FILTERS_SUCCESS', payload: response.data.body.aggregations });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'FETCH_FILTERS_SUCCESS', payload: error.message });
  }
};
