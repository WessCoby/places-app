import React, { FC } from 'react';

import { PlaceItem, Card, Button  } from '..';
import { Place } from '../../types';


interface Props {
  items: Place[];
}

const PlaceList: FC<Props> = ({ items }) => {
  if(items.length === 0) {
    return (
      <div className="place-list center">
        <Card style={{ padding: '1rem' }}>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map(place => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  )
}

export default PlaceList;