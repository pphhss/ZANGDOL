var shelterList = {};
var userList = {}

exports.participate = function (_socket) {
    _socket.on('participate', function (_message) {
        var message = JSON.parse(_message);
        if (message.type == "shelter") {
            shelterList[message.idx] = _socket.id
            console.log("SHELTER" + message.idx + " participate")
        }
        else {
            userList[message.idx] = _socket.id
            console.log("USER" + message.idx + " participate")
        }
    });
    _socket.on('disconnect', function () {
        var idx
        if (!(idx = findShelterIdx(_socket.id)))
            delete shelterList[idx];
        else if (!(idx = findUserIdx(_socket.id)))
            delete userList[idx];

        console.log("delete : " + _socket.id);
    });
}

function findShelterIdx(_id) {
    for (var idx in shelterList)
        if (shelterList[idx] == _id)
            return idx
    return null
}

function findUserIdx(_id) {
    for (var idx in userList)
        if (userList[idx] == _id)
            return idx
    return null
}