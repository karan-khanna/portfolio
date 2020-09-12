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
  height: ${({ isFocused, ratio }) => (isFocused ? `${125 + (ratio * initialVal)}px` : '125px')};
  width: ${({ isFocused, ratio }) => (isFocused ? `${125 + (ratio * initialVal)}px` : '125px')};
  background-color: #c4c4c4;
  border-radius: 50%;
  margin: 0 150px;
  font-size: 40px;
  color: black;
  text-align: center;
  transition: .5s;
  position: relative;
  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }

`;

const ItemTarget = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);

`;

const Timeline = () => {
  const [activeId, setActiveId] = useState(2);
  const [ratio, setRatio] = useState(1);

  const callback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target;
        const iRatio = entry.intersectionRatio;
        const active = id.split('listItem')[1];
        console.log(`INTERSECT ${id}->${iRatio}`);

        setActiveId(+active);
        if (iRatio >= 0 && iRatio < 0.1) {
          setRatio(0);
        } else if (iRatio >= 0.1 && iRatio < 0.3) {
          setRatio(0.2);
        } else if (iRatio >= 0.3 && iRatio < 0.5) {
          setRatio(0.4);
        } else if (iRatio >= 0.5 && iRatio < 0.7) {
          setRatio(0.6);
        } else if (iRatio >= 0.7 && iRatio <= 1) {
          setRatio(1);
        }
      } else {
        const { id } = entry.target;
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
      threshold: [0.2, 0.4, 0.6, 0.8, 1],
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
          <CarouselItem ratio={ratio} isFocused={activeId == 1}>
            {/* {`1-${activeId == 1}`} */}
            <ItemTarget id="listItem1" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 2} id="listItem2">
            {/* {`2-${activeId == 2}`} */}
            <ItemTarget id="listItem2" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 3} id="listItem3">
            {/* {`3-${activeId == 3}`} */}
            <ItemTarget id="listItem3" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 4} id="listItem4">
            {/* {`4-${activeId == 4}`} */}
            <ItemTarget id="listItem4" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 5} id="listItem5">
            {/* {`5-${activeId == 5}`} */}
            <ItemTarget id="listItem5" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 6} id="listItem6">
            {/* {`6-${activeId == 6}`} */}
            <ItemTarget id="listItem6" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 7} id="listItem7">
            {/* {`7-${activeId == 7}`} */}
            <ItemTarget id="listItem7" />
          </CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 8} id="listItem8">
            {/* {`8-${activeId == 8}`} */}
            <ItemTarget id="listItem8" />
          </CarouselItem>
        </CarouselWrapper>
      </CarouselSection>
    </Layout>
  );
};

export default Timeline;
