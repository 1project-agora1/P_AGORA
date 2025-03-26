// 환경 변수 유틸리티 함수
export function getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
        console.log(`환경 변수 ${key}가 정의되지 않았습니다.`);
        return ""; // 기본값 설정
    }
    return value;
}