import React from 'react';
import CardsBoard from 'renderer/components/core/CardsBoard';
import API from './API';
import Http from './Http';

export default function HttpAPI() {
  return (
    <CardsBoard useForm={false}>
      <API />
      <Http />
    </CardsBoard>
  );
}
