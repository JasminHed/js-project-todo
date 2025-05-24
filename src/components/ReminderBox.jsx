import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ReminderWrapper = styled.div`
  background-color: var(--card-bg);
  color: var(--text-dark);
  text-align: center;
  width: 300px;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 10px;

  @media (min-width: 668px) {
    width: 350px;
    height: 220px;
    position: sticky;
    margin-top: 40px;
    padding-top: 40px;
  }

  @media (min-width: 1024px) {
    max-width: 500px;
    height: 260px;
    padding-top: 60px;
  }
`;

const reminders = [
  "Small steps everyday lead to big changes",
  "Stay consistent, not perfect",
  "You’re doing better than you think",
];

const ReminderBox = () => {
  const [reminderIndex, setReminderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReminderIndex((prev) => (prev + 1) % reminders.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ReminderWrapper>
      <h2>Reminder</h2>
      <p>{reminders[reminderIndex]}</p>
    </ReminderWrapper>
  );
};

export default ReminderBox;
