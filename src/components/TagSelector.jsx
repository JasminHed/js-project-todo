import React from "react";
import styled from "styled-components";

const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
`;

const TagButton = styled.button`
  background-color: ${(props) => props.color};
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  justify-content: center;
  padding: 6px 12px;
  color: var(--text-dark);
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
`;

const tags = [
  { label: "School", color: "#FFB347" },
  { label: "Work", color: "#87CEFA" },
  { label: "Personal", color: "#98FB98" },
];

const TagSelector = ({ selectedTag, setSelectedTag }) => {
  return (
    <TagWrapper>
      {tags.map((tag) => (
        <TagButton
          key={tag.label}
          color={tag.color}
          selected={selectedTag === tag.label}
          onClick={() => setSelectedTag(tag.label)}
        >
          {tag.label}
        </TagButton>
      ))}
    </TagWrapper>
  );
};

export default TagSelector;
