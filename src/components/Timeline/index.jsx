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
    min-height: 450px;
    overflow: hidden;
    padding-top: 30px;
  overflow-x: auto;
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

/* const ItemBullet = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: #F02484;
  left: calc(50% - 10px);
  bottom: -40px;
  border-radius: 50%;
  transform: ${({ isFocused }) => (isFocused ? 'scale(.334)' : 'initial')};
`; */

const TimelineCurve = styled.svg`
margin-top:-100px;
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
          {/* <ItemBullet isFocused={activeId === 1} /> */}
          <ItemWrapper isFocused={activeId === 1}>
            <ItemTarget id="listItem1" isFocused={activeId === 1} />

          </ItemWrapper>

          {`1-${activeId === 1}`}
        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 2} /> */}
          <ItemWrapper isFocused={activeId === 2}>
            {`2-${activeId === 2}`}
            <ItemTarget id="listItem2" isFocused={activeId === 2} />

          </ItemWrapper>

        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 3} /> */}
          <ItemWrapper isFocused={activeId === 3}>
            {`3-${activeId === 3}`}
            <ItemTarget id="listItem3" isFocused={activeId === 3} />

          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 4} /> */}
          <ItemWrapper isFocused={activeId === 4}>
            {`4-${activeId === 4}`}
            <ItemTarget id="listItem4" isFocused={activeId === 4} />

          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 5} /> */}
          <ItemWrapper isFocused={activeId === 5}>
            {`5-${activeId === 5}`}
            <ItemTarget id="listItem5" isFocused={activeId === 5} />

          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 6} /> */}
          <ItemWrapper isFocused={activeId === 6}>
            {`6-${activeId === 6}`}
            <ItemTarget id="listItem6" isFocused={activeId === 6} />

          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 7} /> */}
          <ItemWrapper isFocused={activeId === 7}>
            {`7-${activeId === 7}`}
            <ItemTarget id="listItem7" isFocused={activeId === 7} />

          </ItemWrapper>
        </CarouselItem>
        <CarouselItem>
          {/* <ItemBullet isFocused={activeId === 8} /> */}
          <ItemWrapper isFocused={activeId === 8}>
            {`8-${activeId === 8}`}
            <ItemTarget id="listItem8" isFocused={activeId === 8} />

          </ItemWrapper>
        </CarouselItem>
      </CarouselSection>
      <TimelineCurve width="100%" height="191" viewBox="0 0 1170 191" fill="none" xmlns="http://www.w3.org/2000/TimelineCurve">
        <circle cx="1072" cy="56" r="18" fill="#070014" stroke="#F02484" strokeWidth="4" />
        <circle cx="1072" cy="56" r="8" fill="#F02484" />
        <circle cx="94" cy="68" r="18" fill="#070014" stroke="#F02484" strokeWidth="4" />
        <circle cx="94" cy="68" r="8" fill="#F02484" />
        <circle cx="583" cy="171" r="18" fill="#070014" stroke="#F02484" strokeWidth="4" />
        <circle cx="583" cy="171" r="8" fill="#F02484" />
        <path d="M1.5 20.0001C597 376 1168.5 2.50012 1168.5 2.50012" stroke="#F02484" strokeWidth="5" />
      </TimelineCurve>

      <PrevBtn onClick={() => { document.getElementById('scrollArea').scrollLeft = document.getElementById('scrollArea').scrollLeft - 450; }}>{'<< Previous'}</PrevBtn>
      <NextBtn onClick={() => { document.getElementById('scrollArea').scrollLeft = document.getElementById('scrollArea').scrollLeft + 450; }}>{'Next >>'}</NextBtn>

    </Layout>
  );
};

export default Timeline;
/* 640 1164 1660 2183 2676
 */
/* 524 500 523 500 */
