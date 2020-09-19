import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import CarouselItem from './CarouselItem';
import CarouselItemList from './config';

const Layout = styled.div`
  padding: 20px 50px;
  background-color: rgba(66, 0, 198, 0.1);
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
`;

const Heading = styled.h1`
  color: white;
`;

const CarouselSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  overflow: hidden;
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  scroll-snap-type: x mandatory;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const PrevBtn = styled.span`
position: absolute;
    left: 5%;
    top: 40%;
  margin-right: 20px;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;
const NextBtn = styled.span`
position: absolute;
    right: 5%;
    top: 40%;
  color: white;
  font-size: 30px;
  cursor: pointer;
`;

const TimelineCurve = styled.svg`
  margin-top: -150px;
`;

const Wallpaper = styled.img`
  z-index: -1;
  margin: -20px -50px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  opacity: .07;
  height: 100%;
  width:100%;
  transition: .05s;
  filter: blur(3px);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DataWrapper = styled.div`
  position: relative;
`;

const ActiveItemData = styled.div`
  color: white;
  max-width: 500px;
  text-align: center;
  font-size: 20px;
  overflow: hidden;
  margin: 0 auto;
  transition-delay: 1s;
  transition: 1s;
  opacity:  ${({ isFocused }) => (isFocused ? '1' : '0')};
  position: absolute;
    top: 0%;
    left: 26%;
`;

const Timeline = () => {
  const [activeId, setActiveId] = useState(-1);
  const observerRef = useRef(null);

  const callback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target;
        const currentItemId = id.split('item-')[1];
        setActiveId(+currentItemId);
      } else {
        setActiveId(-1);
      }
    });
  });

  useEffect(() => {
    const options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px -500px',
      threshold: [0],
    };
    observerRef.current = new IntersectionObserver(callback, options);
    CarouselItemList.forEach((_, itemId) => observerRef.current.observe(document.getElementById(`item-${itemId}`)));
    document.getElementById('scrollArea').scrollLeft = 85;
  }, []);

  return (
    <Layout>
      {CarouselItemList[activeId] && <Wallpaper src={CarouselItemList[activeId].img} />}

      <Heading>Heading</Heading>
      <CarouselSection id="scrollArea">
        <div>
          {
            CarouselItemList.map(
              (itemConfig, index) => (
                <CarouselItem
                  key={itemConfig.id}
                  activeId={activeId}
                  itemId={index}
                  itemConfig={itemConfig}
                />
              ),
            )
          }

        </div>

      </CarouselSection>
      <TimelineCurve
        width="100%"
        height="191"
        viewBox="0 0 1170 191"
        fill="none"
        xmlns="http://www.w3.org/2000/TimelineCurve"
      >
        <circle
          cx="1072"
          cy="56"
          r="18"
          fill="#070014"
          stroke="#F02484"
          strokeWidth="4"
        />
        <circle cx="1072" cy="56" r="8" fill="#F02484" />
        <circle
          cx="94"
          cy="68"
          r="18"
          fill="#070014"
          stroke="#F02484"
          strokeWidth="4"
        />
        <circle cx="94" cy="68" r="8" fill="#F02484" />
        <circle
          cx="583"
          cy="171"
          r="18"
          fill="#070014"
          stroke="#F02484"
          strokeWidth="4"
        />
        <circle cx="583" cy="171" r="8" fill="#F02484" />
        <path
          d="M1.5 20.0001C597 376 1168.5 2.50012 1168.5 2.50012"
          stroke="#F02484"
          strokeWidth="5"
        />
      </TimelineCurve>

      <DataWrapper>
        {CarouselItemList.map(({ text }, index) => (
          <ActiveItemData
            isFocused={index === activeId}
          >
            {text}
          </ActiveItemData>
        ))}
      </DataWrapper>

      <PrevBtn
        onClick={() => {
          document.getElementById('scrollArea').scrollLeft = document.getElementById('scrollArea').scrollLeft - 450;
        }}
      >
        P
      </PrevBtn>
      <NextBtn
        onClick={() => {
          document.getElementById('scrollArea').scrollLeft = document.getElementById('scrollArea').scrollLeft + 450;
        }}
      >
        N
        <i className="fas fa-chevron-right" />

      </NextBtn>

    </Layout>
  );
};

export default Timeline;
