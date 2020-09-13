import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  padding: 20px 50px;
  background-color: rgba(66, 0, 198, 0.1);
  height: 100%;
`;

const Heading = styled.h1`
  color: white;
`;

const CarouselSection = styled.div`
  padding: 200px 0;
  overflow-x: scroll;
  scroll-behavior: smooth;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
`;

const CarouselItem = styled.div`
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
`;

const ItemTarget = styled.div`
  height: 10px;
  width: 10px;
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  background-color: red;
  transform: scale(.1);
`;

const PrevBtn = styled.span`

border: 1px solid white;
margin-right: 20px;
color: white;
`;
const NextBtn = styled.span`

border: 1px solid white;
  color: white;
`;

const Timeline = () => {
  const [activeId, setActiveId] = useState(-1);

  const callback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target;
        const active = id.split('listItem')[1];
        console.log(`INTERSECT ${id}->${entry.intersectionRatio}`);

        setActiveId(+active);
      } else {
        const { id } = entry.target;
        const active = id.split('listItem')[1];
        setActiveId(-1);
        console.log(`NON ${id}->${entry.intersectionRatio}`);
      }
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
  });
  const observerRef = useRef(null);
  useEffect(() => {
    const options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px -500px',
      threshold: [0],
    };
    observerRef.current = new IntersectionObserver(callback, options);
    ['1', '2', '3', '4', '5', '6', '7', '8'].forEach((id) => observerRef.current.observe(document.querySelector(`#listItem${id}`)));
    document.getElementById('scrollArea').scrollLeft = 85;
  }, []);

  useEffect(() => {
    console.log('Active ID : ', activeId);
  }, [activeId]);

  return (
    <Layout>
      <Heading>Heading</Heading>
      <CarouselSection id="scrollArea">
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 1}>
            <ItemTarget id="listItem1" isFocused={activeId === 1} />
          </ItemWrapper>

          {`1-${activeId === 1}`}
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 2}>
            {`2-${activeId === 2}`}
            <ItemTarget id="listItem2" isFocused={activeId === 2} />
          </ItemWrapper>

        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 3}>
            {`3-${activeId === 3}`}
            <ItemTarget id="listItem3" isFocused={activeId === 3} />
          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 4}>
            {`4-${activeId === 4}`}
            <ItemTarget id="listItem4" isFocused={activeId === 4} />
          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 5}>
            {`5-${activeId === 5}`}
            <ItemTarget id="listItem5" isFocused={activeId === 5} />
          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 6}>
            {`6-${activeId === 6}`}
            <ItemTarget id="listItem6" isFocused={activeId === 6} />
          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 7}>
            {`7-${activeId === 7}`}
            <ItemTarget id="listItem7" isFocused={activeId === 7} />
          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          <ItemWrapper isFocused={activeId === 8}>
            {`8-${activeId === 8}`}
            <ItemTarget id="listItem8" isFocused={activeId === 8} />
          </ItemWrapper>
        </CarouselItem>
      </CarouselSection>
      <PrevBtn onClick={() => { document.getElementById('scrollArea').scrollLeft = document.getElementById('scrollArea').scrollLeft - 515; }}>{'<< Previous'}</PrevBtn>
      <NextBtn onClick={() => { document.getElementById('scrollArea').scrollLeft = document.getElementById('scrollArea').scrollLeft + 515; }}>{'Next >>'}</NextBtn>

    </Layout>
  );
};

export default Timeline;
/* 640 1164 1660 2183 2676
 */
/* 524 500 523 500 */
