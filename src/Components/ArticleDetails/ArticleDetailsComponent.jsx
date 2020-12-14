import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ArticleDetails.css';

export default function ArticleDetailsComponent() {
    const { article } = useSelector(({article}) => article);
    useEffect(() => {
        console.log(article)
    }, [article]);

    return (
            article && 
            <Card className="detail-card">
                <Card.Img variant="top" src={article.urlToImage} />
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle>{article.author}</Card.Subtitle>
                    <Card.Text>
                    {article.description}
                    </Card.Text>
                    <Button variant="primary" href={article.url} target="_blank">Read More</Button>
                </Card.Body>
            </Card>
        );
}