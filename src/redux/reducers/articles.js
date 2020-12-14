export const ARTICLE_LIST = 'ARTICLE_LIST';
export const ARTICLE_DETAIL = 'ARTICLE_DETAIL';
export const USER_LIST_1 = 'USER_LIST_1';
export const LOADED = 'LOADED';
export const LOADING = 'LOADING';
export const FAILED = 'FAILED';


export const getArticleList = (state, articles) => ({
    ...state,
    type: ARTICLE_LIST,
    ...articles
});

export const getArticleDetail = (state, article) => ({
    ...state,
    type: ARTICLE_DETAIL,
    article: article
});

export const updateArticleDetail = (payload) => {
    let article = payload;
    return (dispatch, getState) => {
        dispatch(getArticleDetail(getState(),article))
    };
}

async function fetchApi() {
    return fetch('http://localhost:3030/articles');
}
export const fetchArticleList = () => (dispatch, getState) => {
    const state = getState();
    dispatch(getArticleList(state,{articles: {status: LOADING, data: []}}));
    fetchApi()
    .then((response => response.json()))
    .then((data) => dispatch(getArticleList(state,{articles: {status: LOADED, data: data}})))
    .catch((err) => {
        console.log('Error', err);
        dispatch(getArticleList(getState(),{articles: {status: FAILED}}))
    })
}