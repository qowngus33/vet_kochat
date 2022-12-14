// variables
let userName = null;
let petName = null;
let state = 'SUCCESS';

function Message(arg) {
    this.text = arg.text;
    this.message_side = arg.message_side;

    this.draw = function (_this) {
        return function () {
            let $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);

            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
}

function getMessageText() {
    let $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
}

function sendMessage(text, message_side) {
    let $messages, message;
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
}

function greet() {
    setTimeout(function () {
        return sendMessage("안녕하세요. 증상으로 반려동물 질병을 진단하는 멍냥챗봇입니다.", 'left');
    }, 1000);

    setTimeout(function () {
        return sendMessage("사용할 닉네임을 알려주세요.", 'left');
    }, 2000);
}

function onClickAsEnter(e) {
    if (e.keyCode === 13) {
        onSendButtonClicked()
    }
}

function setUserName(username) {

    if (username != null && username.replace(" ", "" !== "")) {
        setTimeout(function () {
            return sendMessage("반갑습니다 "+username + "님. 닉네임이 설정되었습니다.", 'left');
        }, 1000);
        setTimeout(function () {
            return sendMessage(username + "님의 반려동물 이름을 입력해주세요.", 'left');
        }, 2000);

        return username;

    } else {
        setTimeout(function () {
            return sendMessage("올바른 닉네임을 이용해주세요.", 'left');
        }, 1000);

        return null;
    }
}

function setPetName(petname) {

    if (petname != null && petname.replace(" ", "" !== "")) {
        setTimeout(function () {
            return sendMessage("반려동물 이름이 " + petname + "(으)로 설정되었습니다.", 'left');
        }, 1000);
        setTimeout(function () {
            return sendMessage("저는 반려동물 공공데이터를 기반으로 예상 진단을 내리는 챗봇입니다.", 'left');
        }, 2000);
        setTimeout(function () {
            return sendMessage("무엇이든 물어보세요!", 'left');
        }, 3000);

        return petname;

    } else {
        setTimeout(function () {
            return sendMessage("올바른 반려동물 이름을 입력해주세요.", 'left');
        }, 1000);

        return null;
    }
}

function requestChat(messageText, url_pattern) {
    $.ajax({
        url: "http://127.0.0.1:5000/" + url_pattern + '/' + userName + '/' + messageText,
        type: "GET",
        dataType: "json",
        success: function (data) {
            state = data['state'];
            if (state === 'SUCCESS') {
                setTimeout(function () {
                    return sendMessage(data['answer'], 'left');
                }, 1000);
                setTimeout(function () {
                    return sendMessage("진단받은 질병은 예상진단에 추가됩니다.", 'left');
                }, 2000);
                // 슬롯 필링 구현한 부분 REQUIRE_ (+사용자 정의 태그)
            } else if (state === 'REQUIRE_SYMPTOM1') {
                 return sendMessage('세부적인 증상을 서술해주세요', 'left');
            } else if (state === 'REQUIRE_AREA') {
                return sendMessage('세부적인 부위를 서술해주세요', 'left');
            } else if (state === 'REQUIRE_ANIMAL') {
                return sendMessage('궁금하신 동물의 종류를 입력해주세요 (개/고양이)', 'left');
            } else {
                return sendMessage('죄송합니다. 무슨말인지 잘 모르겠어요.', 'left');
            }
        },
        error: function (request, status, error) {
            console.log(error);
            return sendMessage('죄송합니다. 서버 연결에 실패했습니다.', 'left');
        }
    });
}

function onSendButtonClicked() {
    let messageText = getMessageText();
    sendMessage(messageText, 'right');

    if (userName == null && petName == null) {
        userName = setUserName(messageText);
    } else if (userName != null && petName == null) {
        petName = setPetName(messageText);
    } else {
        if (messageText.includes('안녕') || messageText.includes('안뇽') || messageText.includes('하이')) {
            setTimeout(function () {
                return sendMessage("안녕하세요. 증상으로 반려동물 질병을 진단하는 멍냥챗봇입니다.", 'left');
            }, 1000);
        } else if (messageText.includes('반가워')) {
            setTimeout(function () {
                return sendMessage("안녕하세요. 반갑습니다.", 'left');
            }, 1000);
        } else if (messageText.includes('고마워')) {
            setTimeout(function () {
                return sendMessage("천만에요. 더 물어보실 건 없나요?", 'left');
            }, 1000);
        } else if (state.includes('REQUIRE')) {
            return requestChat(messageText, 'fill_slot');
        } else {
            return requestChat(messageText, 'request_chat');
        }
    }
}