import React from "react";
import styled from "styled-components";
import moment from "moment";

const HeaderWrapper = styled.div`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;

  @media (min-width: 668px) {
    margin-top: 48px;
    margin-bottom: 32px;
  }
`;

const Time = styled.div`
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-color);
`;

const Header = () => {
  const now = moment().format("HH:mm");
  const today = moment().format("dddd D MMMM");

  return (
    <HeaderWrapper>
      <h1>Todays Focus</h1>
      <Time>
        <h2>{now}</h2>
        <p>{today}</p>
      </Time>
    </HeaderWrapper>
  );
};

export default Header;
