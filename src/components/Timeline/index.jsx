import React from "react";
import styled from  "styled-components";

const TimelineHead = styled.div`
color: var(--font-color);
`;

const Timeline = ()=><> <TimelineHead>This is the timeline</TimelineHead>
<button onClick={()=> document.documentElement.setAttribute('theme', document.documentElement.getAttribute('theme')==='dark'?'light':'dark')}>Change theme</button>
</>;

export default Timeline;