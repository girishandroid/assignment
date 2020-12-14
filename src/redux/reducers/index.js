import { INITIAL } from '../state';
import { getArticleList, ARTICLE_LIST} from './articles';

export const reducers = (state = INITIAL, action) => {
    switch (action.type) {
        case ARTICLE_LIST:
            return getArticleList(state, action);
        default:
            return state;
    }
}