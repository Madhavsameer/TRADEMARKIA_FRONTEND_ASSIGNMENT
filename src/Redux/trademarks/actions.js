import axios from 'axios';

export const fetchTrademarks = (status=[], attorneys=[], law_firms=[], owners=[]) => async (dispatch) => {
  dispatch({ type: 'FETCH_TRADEMARKS_REQUEST' });
  const body ={
        "input_query": "check",
        "input_query_type":"",
        "sort_by": "default",
        "status": status,
        "exact_match": false,
        "date_query": false,
        "owners": owners,
        "attorneys": attorneys,
        "law_firms": law_firms,
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
    console.log(response.data.body.hits.hits)
    dispatch({ type: 'FETCH_TRADEMARKS_SUCCESS', payload: response.data.body.hits.hits });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'FETCH_TRADEMARKS_FAILURE', payload: error.message });
  }
};
