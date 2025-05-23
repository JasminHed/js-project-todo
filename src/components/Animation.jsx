import React from "react";
import Lottie from "lottie-react";
import Animation from "../animations/star.json";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 50px;
  max-height: 50px;
  display: flex;
  position: absolute;
  right: 80px;

  @media (min-width: 668px) {
    max-width: 90px;
    max-height: 90px;
  }
`;

const StarAnimation = () => {
  return (
    <Wrapper>
      <Lottie animationData={Animation} loop={false} />
    </Wrapper>
  );
};

export default StarAnimation;
