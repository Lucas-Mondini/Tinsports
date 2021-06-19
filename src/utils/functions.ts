export function formatName(name: string, setState: (value: string) =>void){
  let nameArray = name.split(" ");
  const formatName: string[] = [];

  nameArray.forEach(name =>{
    formatName.push(name.charAt(0).toUpperCase() + name.substr(1));
  });

  return setState(formatName.join(" "));
}

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
  let formatMoney = ""

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