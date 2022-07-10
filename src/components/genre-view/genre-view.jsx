import React from 'react';
import './genre-view.scss'
import { Card, Button } from 'react-bootstrap';


export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (

            <Card text='dark' className="genreCard">
                <Card.Header>{genre.Name}</Card.Header>
                <Card.Body>
                    <Card.Text>{genre.Description}</Card.Text>
                    <Button variant="warning" onClick={() => { onBackClick() }}>Back</Button>
                </Card.Body>
            </Card>
        )
    }

}