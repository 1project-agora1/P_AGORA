import { ChannelQeury } from "../query/ChannelQuery";
import {
    ChannelCreateRequest,
    ChannelItemCreateRequest,
} from "../request/ChannelRequest";

export class ChannelRepository {
    private query: ChannelQeury;

    constructor() {
        this.query = new ChannelQeury();
    }

    //채널 리스트 조회
    async getChannelList() {
        return await this.query.getChannelList();
    }

    //채널 리스트 저장
    async createItemChannel(request: ChannelItemCreateRequest) {
        return await this.query.createItemChannel(request);
    }

    //채널 저장
    async createChannel(request: ChannelCreateRequest) {
        return await this.query.createChannel(request);
    }

    //   // 이메일-비밀번호로 유효한 유저 확인
    //   async findValidUserByEmailWithPassword(email: string, password: string) {
    //     const user = await this.query.findByEmailWithPassword(email);

    //     if (!user) {
    //       // 조기 반환 패턴 적용
    //       throw new AuthenticationError("존재하지 않는 사용자");
    //     }

    //     const isValid = await bcrypt.compare(password, user.password);
    //     if (!isValid) {
    //       // 비밀번호 검증
    //       throw new AuthenticationError("비밀번호 불일치");
    //     }

    //     return user;
    //   }

    //   // 이메일-닉네임으로 이미 존재하는 유저가 있는지 확인
    //   async findValidUserByEmailAndNickname(email: string, nickname: string) {
    //     // 단일 쿼리로 중복 체크 최적화
    //     const user = await this.query.findByEmailAndNickname(email, nickname);

    //     if (user) {
    //       // 중복 에러 처리
    //       const errorMessage =
    //         user.email === email
    //           ? "이미 사용 중인 이메일입니다"
    //           : "이미 사용 중인 닉네임입니다";

    //       throw new DuplicateUserError(errorMessage);
    //     }

    //     return user;
    //   }

    //   // 새로운 유저 생성
    //   async createNewUser(email: string, nickname: string, password: string) {
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await this.query.createUser(email, nickname, hashedPassword);

    //     // 쿠키 설정
    //     await setCookie(process.env.ACCESS_TOKEN!, user.nickname, user.email);
    //   }

    //   async setCookie(cookieName: string, nickname: string, email: string) {
    //     // 쿠키 설정
    //     await setCookie(cookieName, nickname, email);
    //   }

    //   async deleteCookie(cookieName: string) {
    //     // 쿠키 삭제
    //     await deleteCookie(cookieName);
    //   }
}
