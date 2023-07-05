import React from "react";
import './CurrentDate.css';
const today = new Date();
const Day = new Date().getDate();
const currentMonth = new Date().toLocaleString('default', { month: 'long' });




function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function CurrentDate() {
  return (
    <h2>{formatDate(today)}/{Day}/{currentMonth}/{new Date().getFullYear()}</h2>
    
  );
}

