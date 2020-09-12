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
  min-height: 400px;
  `;
const initialVal = 150;
const CarouselItem = styled.div`
  height: ${({ isFocused, ratio }) => (isFocused ? `${initialVal + (ratio * initialVal)}px` : '150px')};
  width: ${({ isFocused, ratio }) => (isFocused ? `${initialVal + (ratio * initialVal)}px` : '150px')};
  background-color: #c4c4c4;
  border-radius: 50%;
  margin: 0 150px;
  font-size: 40px;
  color: black;
  text-align: center;
  transition: .5s;
  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
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
        if (iRatio >= 0 && iRatio < 0.2) {
          setRatio(0.1);
        } else if (iRatio >= 0.2 && iRatio < 0.4) {
          setRatio(0.3);
        } else if (iRatio >= 0.4 && iRatio < 0.6) {
          setRatio(0.5);
        } else if (iRatio >= 0.6 && iRatio < 0.8) {
          setRatio(0.7);
        } else if (iRatio >= 0.8 && iRatio < 1) {
          setRatio(0.9);
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
      rootMargin: '0px -410px',
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
          <CarouselItem ratio={ratio} isFocused={activeId == 1} id="listItem1">{`1-${activeId == 1}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 2} id="listItem2">{`2-${activeId == 2}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 3} id="listItem3">{`3-${activeId == 3}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 4} id="listItem4">{`4-${activeId == 4}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 5} id="listItem5">{`5-${activeId == 5}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 6} id="listItem6">{`6-${activeId == 6}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 7} id="listItem7">{`7-${activeId == 7}`}</CarouselItem>
          <CarouselItem ratio={ratio} isFocused={activeId == 8} id="listItem8">{`8-${activeId == 8}`}</CarouselItem>
        </CarouselWrapper>
      </CarouselSection>
    </Layout>
  );
};

export default Timeline;
