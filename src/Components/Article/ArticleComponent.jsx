import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING, fetchArticleList, FAILED } from '../../redux/reducers/articles';
import './Article.css';

export default function ArticleComponent() {
    const articles = useSelector(({articles}) => articles);
    const dispatch = useDispatch();
    const {data, status} = articles;
    const [cardSelectedItem, setSelectedItem] = useState();

    useEffect(() => {
        dispatch(fetchArticleList())
    }, [])
    useEffect(() => setSelectedItem(data && data[0]), [data])

    return (<React.Fragment>
        {status === LOADING ? <div>Loading ...</div>
        :
        (status === FAILED || !data) ? <div>Fetch Error ... Try clearing cache and load again</div>
        :
        (<React.Fragment>
            {cardSelectedItem && <Card className="detail-card">
                                    <Card.Img variant="top" src={cardSelectedItem.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{cardSelectedItem.title}</Card.Title>
                                        <Card.Subtitle>{cardSelectedItem.author}</Card.Subtitle>
                                        <Card.Text>
                                        {cardSelectedItem.description}
                                        </Card.Text>
                                        <Button variant="primary" href={cardSelectedItem.url} target="_blank">Read More</Button>
                                    </Card.Body>
                                </Card>}
            <ListGroup className="Article">
                    {
                        data?.map(item => 
                            <ListGroup.Item action onClick={() => {
                                typeof window !== 'undefined' && window.scrollTo(0, 0);
                                setSelectedItem(item)
                                }}>
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
    </React.Fragment>)
}