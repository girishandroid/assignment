import { INITIAL } from '../state';
import { getArticleList, getArticleDetail, ARTICLE_LIST, ARTICLE_DETAIL} from './articles';

export const reducers = (state = INITIAL, action) => {
    switch (action.type) {
        case ARTICLE_LIST:
            return getArticleList(state, action);
        case ARTICLE_DETAIL:
            return getArticleDetail(state, action);
        default:
            return state;
    }
}