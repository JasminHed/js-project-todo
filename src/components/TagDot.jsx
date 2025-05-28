import React from "react";
import styled from "styled-components";

const tagColors = {
  School: "#FFB347",
  Work: "#87CEFA",
  Personal: "#98FB98",
};

const Dot = styled.span`
  background-color: ${(props) => props.color || "black"};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-left: 10px;

  @media (max-width: 667px) {
    margin: 6px 0;
  }
`;

const TagDot = ({ tag }) => {
  const color = tagColors[tag] || "black"; // Sets background color to the color prop passed to the component, defaults to black if no color is provided.
  return <Dot color={color} title={tag} aria-label={`Tag: ${tag}`} />;
  //passing the color pop from tagcolor
};

export default TagDot;
