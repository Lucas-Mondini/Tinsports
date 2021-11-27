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

export function stringToDate(date: string, hour: string): Date {
  const formatDate = date.split('/');

  return new Date(`${formatDate[2]}-${formatDate[1]}-${formatDate[0]}T${hour}`);
}

export function splitText(text: string, delimiter: number): string {
  const formattedText = text.substr(0, delimiter).trim() + (text.length > delimiter ? "..." : "");
  return formattedText;
}

export function getFirstName(name: string):string {
  const firstName = name.split(" ")[0];
  return firstName;
}