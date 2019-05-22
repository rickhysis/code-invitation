function solution(N, users) {
    var answer = [];
    var arr = []
    var fail = 0
    var num_of_users = 0

    for(i = 1; i <= N; i++){
        fail = 0
        num_of_users = 0

        for(var key in users){

            if(users[key] === i)
                fail++

            if(users[key] >= i)
                num_of_users++
        }
        stage_failure = fail / num_of_users
        arr.push([stage_failure, i])
    }
   
    arr.sort(function(a, b){ return b[0] - a[0] });
    answer = arr.map(function(el){ return el[1] })

    return answer;
}


console.log(solution(5, [2,1,2,6,2,4,3,3]))
// result : [ 3, 4, 2, 1, 5 ]
// console.log(solution(4, [4,4,4,4]))
// result : [ 4, 1, 2, 3 ]