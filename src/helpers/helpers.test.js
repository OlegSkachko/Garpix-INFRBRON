const { checkValidationPassword, checkValidationLogin } = require("./authHelper")
const { getPagesArray } = require("./pageHelper")
const { correctTime } = require("./timeHelper")

describe("Testing correctTime function", ()=>{
    test("Expect correct time", ()=> {
        expect(correctTime("2022-03-20T12:03:47.924Z")).toBe("15:03")
    })
    test("Expect correct time", ()=> {
        expect(correctTime("2022-03-20T12:03:47.924Z")).not.toBe("15:04")
    })
    test("Checking uncorrect value", ()=> {
        expect(correctTime("2022-03-20T12:47.924Z")).toBe("Invalid Date")
    })
}) 

describe("Testing pageHelper", ()=>{
    test("Expect correct array", ()=> {
        expect(getPagesArray(5)).toEqual([1,2,3,4,5])
    })
    test("Checking uncorect value", ()=> {
        expect(getPagesArray(0)).toEqual([1])
    })
    test("Checking uncorect value", ()=> {
        expect(getPagesArray(-2)).toEqual([1])
    })
}) 

describe("Testing authHelper", ()=>{
    let validationErr
    beforeEach( ()=>{
        validationErr = { email: '', password: ''}    
    })

    test("Expect correct password error message", ()=> {
        expect(checkValidationPassword("", validationErr))
        .toEqual({password:'поле не должно быть пустым', email: ''})
    })
    test("Expect correct password error message", ()=> {
        expect(checkValidationPassword("ddd", validationErr))
        .toEqual({password:'пароль слишком короткий', email: ''})
    })
    test("Expect correct password error message", ()=> {
        expect(checkValidationPassword("dddqwertyqdddqwertyqdddqwertyqdddqwertyqdddqwertyqdddqwertyqdddqwertyqdddqwertyqdddqwertyqdddqwertyqf", validationErr))
        .toEqual({password:'пароль слишком длинный', email: ''})
    })
    test("Expect correct password error message", ()=> {
        expect(checkValidationPassword("dddqwertyq", validationErr))
        .toEqual({password:'пароль должен содержать минимум 1 цифру', email: ''})
    })
    test("Expect correct password error message", ()=> {
        expect(checkValidationPassword("dddqwertyq3", validationErr))
        .toEqual({password:'пароль должен содержать минимум 1 заглавную букву', email: ''})
    })
    test("Expect correct password error message", ()=> {
        expect(checkValidationPassword("dddqwertyq3Aяр_", validationErr))
        .toEqual({password:'пароль должен содержать латиницу или цифры', email: ''})
    })

    test("Expect correct login error message", ()=> {
        expect(checkValidationLogin("", validationErr))
        .toEqual({password:'', email: 'поле не должно быть пустым'})
    })
    test("Expect correct login error message", ()=> {
        expect(checkValidationLogin("q", validationErr))
        .toEqual({password:'', email: 'email слишком короткий'})
    })
    test("Expect correct login error message", ()=> {
        expect(checkValidationLogin("qwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertywqwertyqwertyqwertyqwertyw", validationErr))
        .toEqual({password:'', email: 'email слишком длинный'})
    })
    test("Expect correct login error message", ()=> {
        expect(checkValidationLogin("qwerdsjs", validationErr))
        .toEqual({password:'', email: 'email должен содержать @'})
    })
    test("Expect correct login error message", ()=> {
        expect(checkValidationLogin("qwerd@sjsяблоко_", validationErr))
        .toEqual({password:'', email: 'email должен содержать латиницу или цифры'})
    })
}) 