export const calculateDollarSign = function(number){
  let result = '';
  for (let i = 0; i < number; i++) {
    result += '$';
  }
  return result;
}