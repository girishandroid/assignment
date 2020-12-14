import React, { useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOADING, fetchArticleList, FAILED, updateArticleDetail } from '../../redux/reducers/articles';
import './Article.css';

export default function ArticleComponent() {
    const articles = useSelector(({articles}) => articles);
    const dispatch = useDispatch();
    const {data, status} = articles;
    const history = useHistory();

    useEffect(() => dispatch(fetchArticleList()), []);

    return (<React.Fragment>
        {status === LOADING ? <div>Loading ...</div>
        :
        (status === FAILED || !data) ? <div>Fetch Error ... Try clearing cache and load again</div>
        :
        (<React.Fragment>
            <ListGroup className="Article">
                    {
                        data?.map(item => 
                            <ListGroup.Item action onClick={() => {
                                    dispatch(updateArticleDetail(item));
                                    history.push('/article-detail');
                                }} key={item.title}>
                                <Card>
                                    <Card.Img variant="top" src={item.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Subtitle>{item.author}</Card.Subtitle>
                                        <Card.Text>
                                        {item.content}
                                        </Card.Text>
                                        <Button variant="primary" href={item.url} target="_blank">Read More</Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>)
                    }
            </ListGroup>
        </React.Fragment>)}
    </React.Fragment>);
}