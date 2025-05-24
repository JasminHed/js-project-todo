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
  margin-right: 8px;
`;

const TagDot = ({ tag }) => {
  const color = tagColors[tag] || "black";
  return <Dot color={color} title={tag} aria-label={`Tag: ${tag}`} />;
};

export default TagDot;
