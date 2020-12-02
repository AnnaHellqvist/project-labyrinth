import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { game } from '../reducers/game';
import { chooseDirection, StartGame } from '../reducers/fetch';

import styled from 'styled-components';
import { Button, Background, ButtonWrapper, MainText, History } from './styling';
import Loader from './Loader';

const GameControls = () => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.game.name)
  const gameState = useSelector((state) => state.game.game)
  const gameArray = useSelector((state) => state.game.game.actions)
  const loader = useSelector((state) => state.game.isLoading)
  const history = useSelector((state) => state.game.history)

  const onChooseDirection = (direction) => {
    dispatch(chooseDirection(userName, direction));
    dispatch(game.actions.setLoader(true));
    dispatch(game.actions.setHistory(direction));
  }

  return (
  <>
    {loader && <Loader />}
    <Background>
      
      <MainText>{gameState.description}</MainText>
      
      <ButtonWrapper>
      {!loader && gameArray && (gameArray.map((item, index) => {
          return (
            <Button onClick={() => onChooseDirection(item.direction)} key={index}>
              <p>Go {item.direction}</p>
            </Button>            
            )
          })
        )
      }
      </ButtonWrapper>
      {history.length > 0 && <MainText>Your journey</MainText>}
    <History>{history.map((item, index) => {
      return ( 
        <MainText>
          {index +1}) {item}
        </MainText>
      )
    })}</History>
      </Background>
  </>
  );
};

export default GameControls;