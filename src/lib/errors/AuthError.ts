// 커스텀 에러 - 인증 관련
export class AuthenticationError extends Error {
    constructor(message = '인증 실패') {
        super(message)
        this.name = 'AuthenticationError'
    }
}
export class DuplicateUserError extends Error {
    constructor(message = '중복 유저') {
        super(message);
        this.name = 'DuplicateUserError'
    }
}