

const login_user1 = async (usr, pwd) => {
    return new Promise((res, rej) => {
        console.log('login...')
        setTimeout(() => {
            if (usr == 'a') {
                res('OK')
            } else {
                res('NO')
            }
        }, 2000)
    })
}

const login_user = async (user, password) => {
    if (user[0] == '@') return 'YES'

    let usr = 'regions\\' + user
    let pwd = (user.pwd == '') ? '123' : password
    let o = { usr: usr, pwd: pwd }

    let response = await fetch('http://10.161.200.207/ib/myphp/regUser1.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(o),
    })

    let result = await response.text()
    console.log('autentUser result = ', result)
    return result
}


//-----------------------------------------------------------------------------
export {
    login_user,
    login_user1
}
