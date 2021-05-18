export function formatName(name: string){
  let nameArray = name.split(" ");
  const formatName: string[] = [];

  nameArray.forEach(name =>{
    formatName.push(name.charAt(0).toUpperCase() + name.substr(1));
  });

  return formatName.join(" ");
}

export function formatMoney(money: number){
  if(!money) return '--';

  let formatMoney = money.toFixed(2);
  formatMoney = String(formatMoney).replace('.', ',');
  return formatMoney;
}