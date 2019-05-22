function solution(relation) {
    var answer = 0
    var attribute = []    
    var arr = []

    var hasDuplicates = function(array) {
        return (new Set(array)).size !== array.length;
    }

    for (var key in relation) {
        arr.push(relation[key][0])
        attribute.push(relation[key].slice(1))
    }

    if(!hasDuplicates(arr))
        answer++

    for (var i = 0; i < attribute[0].length; i++) {
        arr = []
        for (var key in attribute) {
            arr.push( attribute[key][i] + attribute[key][i >= attribute[0].length - 1 ? 0 : i + 1 ] )
        }

        if(!hasDuplicates(arr))
            answer++
    }
    
    return answer;
}

console.log(solution([
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"]
]))
// result : 2
