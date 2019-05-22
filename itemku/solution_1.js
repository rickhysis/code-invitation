function solution(record) {
    var answer = []
    var word_record = ['Enter', 'Leave', 'Change']
    var word_answer = ['came in', 'has left', 'changes nickname to']
    var users = []
    var string = ''
    var split, first_word, user

    for (var key in record) {
        split = record[key].split(" ")

        if (split[0] === word_record[0]) {
            users.push({ nickname: split[0], user_id: split[1] })
        }

        first_word = word_record.findIndex(function (element) {
            return element === split[0]
        });

        user = users.find(function (element) {
            return element.user_id === split[1]
        });

        if (first_word === 2) {
            user.nickname = split[2]
            string = user.user_id + ' ' + word_answer[first_word] + ' ' + (user.nickname).charAt(0).toUpperCase() + (user.nickname).slice(1)
        } else {
            string = (user.nickname).charAt(0).toUpperCase() + (user.nickname).slice(1) + ' ' + word_answer[first_word]
        }

        answer.push(string)
    }
    return answer
}


console.log(solution([
    "Enter uid0002 Muzi",
    "Enter uid0001 Prodo",
    "Leave uid0002",
    "Enter uid0001 Prodo",
    "Change uid0001 Zoel",
    "Leave uid0001"
]))
// result : [
//   'Muzi came in',
//   'Prodo came in',
//   'Muzi has left',
//   'Prodo came in',
//   'uid0001 changes nickname to Zoel',
//   'Zoel has left'
// ]