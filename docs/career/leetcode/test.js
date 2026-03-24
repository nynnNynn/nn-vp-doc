const temp = {
    'a.b.c': 2,
    'a.d': 3,
}
function get(){
    let result = {};
    Object.entries(temp).forEach(
        (item, id) => {
            //[ 'a.b.c', 2 ]
            console.log(item[0].split('.'));
            let temp_result = result
            // [ 'a', 'b', 'c' ]
            item[0].split('.').forEach(
                (alpha, idx) => {
                    if
                }
            )

        }
    )
    console.log(Object.entries(temp));
    return result;
}
get(temp);