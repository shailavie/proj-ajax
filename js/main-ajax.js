'use strict'

var gUsersNum = 4;

function init() {
    initAsk();
    getUsers();
}

function getUsers() {
    var results = document.getElementById('results');
    var r = new XMLHttpRequest();
    var url = `http://www.filltext.com?rows=${gUsersNum}&id={index}&firstName={firstName}&lastName={lastName}&business={business}&address={streetAddress}&phone={phone|format}&email={email}`
    r.open("GET", url, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        var users = JSON.parse(r.responseText);
        console.log(JSON.parse(r.responseText))
        results.innerHTML = getUsersHtml(users);
    };
    r.send();
}

function getUsersHtml(users) {
    var usersHtmls = users.map(user => {
        var strHtml = `<article class="user-card effect3">
                        <div class="profile-pic-container">
                            <img src="https://api.adorable.io/avatars/200/${user.firstName}.png" alt="" class="profile-pic">
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>${user.lastName} ${user.firstName}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Organization</td>
                                    <td>${user.business}</td>
                                </tr>
                                <tr>
                                    <td>Work Address</td>
                                    <td>${user.address}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>${user.phone}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>${user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </article>`
        return strHtml
    }).join('')
    return usersHtmls
}

function checkQuestion(val) {
    console.log(val)
    var regex = /[a-zA-Z]{3,}[?]/ig;
    if (regex.test(val)) {
        $.get('https://yesno.wtf/api', yesNo => {
            $('.ask-container').height(800);
            $('.yes-no').html(yesNo.answer);
            $('.yes-no-img').attr('src', yesNo.image);
            $('.yes-no-img-cont').show('fade');
            console.log('answer:', yesNo.answer)
            if (yesNo.answer === 'yes') {
                $.get('http://api.icndb.com/jokes/random', res => {
                    $('.joke').text(res.value.joke);
                })
            } else {
                $.get('https://dog.ceo/api/breeds/image/random', res => {
                    $('.dog').attr('src', res.message);
                    $('.dog-cont').show();
                    // $('.ask-container').height(200);
                })
            }
        })
    } else if (val === '') {
        init()
    } else {
        console.log('hmmm, that is not a question')
    }
}

function setUsers(num) {
    gUsersNum = num;
}

function initAsk(){
    $('.ask-container').height(400)
    $('.yes-no').html = ''
    $('.dog-cont').hide();
    $('.yes-no-img-cont').hide();
    $('.joke').text('');
}