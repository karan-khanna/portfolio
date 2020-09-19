import React from 'react';
import styled from 'styled-components';

const CarouselItemContainer = styled.div`
  display: inline-block;
  width: 33.4%;
  scroll-snap-align: center;

  &:first-of-type {
    visibility: hidden;
  }

  &:last-of-type {
    visibility: hidden;
  }
`;

const ItemWrapper = styled.div`
  object-fit: contain;
  overflow: hidden;
  margin: auto;
  text-align: center;
  position: relative;
  height: 150px;
  width: 150px;
  background-color: #c4c4c4;
  border-radius: 50%;
  font-size: 20px;
  color: black;
  transition: ${({ isFocused }) => (isFocused ? '.6s' : '.2s')};
  position: relative;
  transform: ${({ isFocused }) => (isFocused ? 'scale(3)' : 'initial')};

  img {
    filter: ${({ isFocused }) => (isFocused ? 'initial' : 'blur(2.5px)')};
  }

  div {
    display: inline-block;
  }
`;

const ItemTarget = styled.div`
  height: 10px;
  width: 10px;
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  transform: scale(0.1);
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemTitle = styled.div`
  width: 100%;
  background: black;
  opacity: .88;
  color: white;
  position: absolute;
  left: 0;
  top:  ${({ isFocused }) => (isFocused ? '80%' : '100%')};
  transition: ${({ isFocused }) => (isFocused ? '.6s' : '.4s')};
  transition-delay: ${({ isFocused }) => (isFocused ? '.4s' : '0s')};
`;

const CarouselItem = ({ activeId, itemId, itemConfig: { img, title } }) => {
  const isFocused = activeId === itemId;

  return (
    <CarouselItemContainer>
      <ItemWrapper isFocused={isFocused}>
        <ItemImage src={img} />
        <ItemTarget id={`item-${itemId}`} isFocused={isFocused} />
        <ItemTitle isFocused={isFocused}>{title}</ItemTitle>
      </ItemWrapper>
    </CarouselItemContainer>
  );
};

export default CarouselItem;
