import IValidationErr from "@/interfaces/authorisationTypes"


export function checkValidationPassword(pass:string, validationErr: IValidationErr) {
    let length = pass.length
    if(!length) validationErr.password = 'поле не должно быть пустым'
    else if(length<8) validationErr.password = 'пароль слишком короткий'
    else if(length>100)  validationErr.password = 'пароль слишком длинный'
    else if(!pass.match(/\d/))  validationErr.password = 'пароль должен содержать минимум 1 цифру'
    else if(!pass.match(/[A-Z]/))  validationErr.password =  'пароль должен содержать минимум 1 заглавную букву'
    else if(!pass.match(/^[a-zA-Z0-9]+$/))  validationErr.password =  'пароль должен содержать латиницу или цифры'
    else validationErr.password = ''
    let newValidationErr = {...validationErr}
    return newValidationErr
}

export function checkValidationLogin(log:string, validationErr: IValidationErr) {
    let length = log.length
    if(!length) validationErr.email = 'поле не должно быть пустым'
    else if(log.length<2) validationErr.email = 'email слишком короткий'
    else if(log.length>254) validationErr.email =  'email слишком длинный'
    else if(!log.match('@')) validationErr.email = 'email должен содержать @'
    else if(!log.match(/^[a-zA-Z0-9@._]+$/)) validationErr.email = 'email должен содержать латиницу или цифры'
    else validationErr.email = ''
    let newValidationErr = {...validationErr}
    return newValidationErr
}


