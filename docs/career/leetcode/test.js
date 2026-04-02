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