function flatter(arr){
  let result = [];
  function flatHelper(arr_temp){
    arr_temp.forEach(
      (item) => {
        // console.log(typeof item);
        if(typeof item !== 'object'){
          
          result.push(item);
        } else{
          flatHelper(item);
        }
      }
    )

  }
  flatHelper(arr);
  return result;
}
const temp = [1, [2, [3, [], 4]], 5];
console.log(flatter(temp));
let str = '12141414241241';
str.slice


/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let temp = s.split('');
  for(let i = 0; i < temp.length/ 2; i++){
      [temp[i], temp[temp.length - 1 - i]] = [temp[temp.length - 1 - i], temp[i]];
  }
  let ind_head = 0;
  let ind_tail = 0;
  while(ind_tail < temp.length){
    

    
  }

};