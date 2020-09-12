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
  margin-top: 100px; 
  overflow-x: scroll;
`;

const CarouselWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-height: 600px;
  `;
const initialVal = 200;
const CarouselItem = styled.div`
    width: 520px;
    /* text-align: center; */
    display: flex;
    justify-content: center;
  &:first-of-type {
   visibility: hidden;
  }

  &:last-of-type {
   visibility: hidden;
  }

`;

const ItemWrapper = styled.div`
text-align: center;
  position: relative;
  height: 150px;
  width: 150px;
  background-color: #c4c4c4;
  border-radius: 50%;
  font-size: 20px;
  color: black;
  transition: .8s;
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

`;

const Timeline = () => {
  const [activeId, setActiveId] = useState(2);

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
        /*         setActiveId(-1); USE when all small at a time. */
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
      rootMargin: '0px -400px',
      threshold: [0],
    };
    observerRef.current = new IntersectionObserver(callback, options);
    ['1', '2', '3', '4', '5', '6', '7', '8'].forEach((id) => observerRef.current.observe(document.querySelector(`#listItem${id}`)));
  }, []);

  useEffect(() => {
    console.log('Active ID : ', activeId);
  }, [activeId]);

  return (
    <Layout>
      <Heading>Heading</Heading>
      <CarouselSection id="scrollArea">
        <CarouselWrapper>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 1}>
              <ItemTarget id="listItem1" />
            </ItemWrapper>

            {`1-${activeId == 1}`}
          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 2}>
              {`2-${activeId == 2}`}
              <ItemTarget id="listItem2" />
            </ItemWrapper>

          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 3}>
              {`3-${activeId == 3}`}
              <ItemTarget id="listItem3" />
            </ItemWrapper>
          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 4}>
              {`4-${activeId == 4}`}
              <ItemTarget id="listItem4" />
            </ItemWrapper>
          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 5}>
              {`5-${activeId == 5}`}
              <ItemTarget id="listItem5" />
            </ItemWrapper>
          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 6}>
              {`6-${activeId == 6}`}
              <ItemTarget id="listItem6" />
            </ItemWrapper>
          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 7}>
              {`7-${activeId == 7}`}
              <ItemTarget id="listItem7" />
            </ItemWrapper>
          </CarouselItem>
          <CarouselItem>
            <ItemWrapper isFocused={activeId == 8}>
              {`8-${activeId == 8}`}
              <ItemTarget id="listItem8" />
            </ItemWrapper>
          </CarouselItem>
        </CarouselWrapper>
      </CarouselSection>
    </Layout>
  );
};

export default Timeline;
