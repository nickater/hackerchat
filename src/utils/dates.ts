import { Timestamp } from 'firebase/firestore';

export const compareYears = (firstYear: number, secondYear: number) => firstYear === secondYear;
export const compareMonth = (firstMonth: number, secondMonth: number) => firstMonth === secondMonth;
export const compareDay = (firstDay: number, secondDay: number) => firstDay === secondDay;

export const isSameDay = (firstDate: Date, secondDate: Date): boolean => {
  let sameDay = true;
  const firstYear = firstDate.getFullYear();
  const secondYear = secondDate.getFullYear();
  const firstMonth = firstDate.getMonth();
  const secondMonth = secondDate.getMonth();
  const firstDay = firstDate.getDay();
  const secondDay = secondDate.getDay();
  if(!compareYears(firstYear, secondYear)) {
    sameDay = false;
  }
  if(sameDay && !compareMonth(firstMonth, secondMonth)) {
    sameDay = false;
  }
  if(sameDay && !compareDay(firstDay, secondDay)) {
    sameDay = false;
  }
  return sameDay;
};

export const dateString = (timestamp?: Timestamp) => {

  if(timestamp) {
    return timestamp.toDate().toLocaleDateString();
  } 
  return new Date();
};