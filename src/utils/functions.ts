export function formatHour(hour: string) {
  let formatHour = ""

  switch (hour.length) {
    case 2:
      formatHour = hour += ":";
      break;
    default:
      formatHour += hour;
  }

  return formatHour;
}

export function formatMoney(money: string) {
  let formatMoney = "";

  switch (money.length) {
    case 2:
      formatMoney = money += ",";
      break;
    default:
      formatMoney += money;
  }

  return formatMoney;
}

export function formatDate(date: string):string {
  let formatDate = ""

  switch (date.length) {
    case 2:
      formatDate = date += "/";
      break;
    case 5:
      formatDate = date += "/";
      break;
    default:
      formatDate += date;
  }

  return formatDate;
}

export function stringToDate(date: string, hour: string): Date {
  const formatDate = date.split('/');
  const newDate = new Date(`${formatDate[2]}-${formatDate[1]}-${formatDate[0]} ${hour}`);

  return newDate;
}

export function toDateString(date: Date): string {
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;

  return `${day}/${month}/${date.getFullYear()}`;
}

export function hourToString(date: Date):string {
  const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

  return `${hour}:${minutes}`;
}

export function splitText(text: string, delimiter: number): string {
  const formattedText = text.substr(0, delimiter).trim() + (text.length > delimiter ? "..." : "");
  return formattedText;
}

export function getFirstName(name: string):string {
  const firstName = name.split(" ")[0];
  return firstName;
}