import React from "react";
import styled from "styled-components";

const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TagButton = styled.button.attrs({ type: "button" })`
  background-color: ${(props) => props.color};
  color: var(--text-dark);
  border: ${(props) =>
    props.selected ? "1px solid var(--text-dark)" : "1px solid transparent"};
  border-radius: 8px;
  justify-content: center;
  padding: 6px 12px;
  color: var(--text-dark);
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.85)};

  &:hover {
    opacity: 1;
    filter: brightness(0.95);
    box-shadow: 0 0 0 2px var(--text-dark);
  }
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
        //Creates a clickable tag button that toggles selection and style based on the tag's color and selection state.
        <TagButton
          key={tag.label}
          color={tag.color}
          selected={selectedTag === tag.label}
          onClick={() =>
            setSelectedTag(selectedTag === tag.label ? null : tag.label)
          }
        >
          {tag.label}
        </TagButton>
      ))}
    </TagWrapper>
  );
};

export default TagSelector;
