# 1️⃣ Node.js 20 버전의 공식 이미지 사용
FROM node:20

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ 패키지 파일 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# 4️⃣ Next.js 소스 코드 복사
COPY . .

# 5️⃣ Next.js 빌드 실행
RUN npm run build

# 6️⃣ 포트 설정 (Next.js 기본 포트)
EXPOSE 3000

# 7️⃣ Next.js 애플리케이션 실행 (프로덕션 모드)
CMD ["npm", "run", "start"]