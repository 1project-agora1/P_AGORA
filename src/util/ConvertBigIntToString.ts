// bigint 를 json으로 리턴시 에러가 발생하는 경우 bigint를 string으로 변환하는 함수를 사용합니다.

export function convertBigIntToString<T extends Record<string, unknown>>(
  obj: T | T[]
): T | T[] {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
