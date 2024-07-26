const express = require("express"); //express 모듈 연결(node.js 위한 프레임워크)
const next = require("next");
const routes = require("./src/routes");
require("dotenv").config();

//환경변수 production 아닌 경우 dev를 true 설정
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

//next.js 초기화 완료 후 핸들러 가져오기2
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express(); //서버셋팅시작

  server.use(express.json()); //express body 파싱관련

  //api 라우터 설정 >> 해당 경로로 들어오는 모든 요청을 routes로 정의된 라우터로 처리
  server.use("/api", routes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  //해당포트에서 서버 시작
  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
