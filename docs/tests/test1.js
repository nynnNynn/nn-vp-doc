/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let result = [];
    let used = new Array(nums.length).fill(false);
    function backtrace(temp, used){
        if(temp.length === nums.length){
            result.push([...temp]);
            return; 
        }
        for(let i = 0; i < nums.length; i++){
            if(!used[i]){
                temp.push(nums[i]);
                used[i] = true;
                backtrace([...temp], used);
                temp.pop();
                used[i] = false;
            }
        }
    }
    backtrace([], used);
    return result;
};