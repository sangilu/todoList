/* Express.js에서의 라우터 역할
 1. 경로와 핸들러 함수 매핑
 - 라우터는 URL 경로와 해당 경로에 대한 HTTP 요청을 처리할 함수를 매핑 
 2. 모듈화 및 구조화
 - 라우터를 사용하면 애플리케이션의 라우팅 로직을 모듈화하고 구조화
 3. 미들웨어 사용
 - 라우터는 특정 경로에 미들웨어를 적용 가능 
   미들웨어는 요청이 실제 핸들러 함수에 도달하기 전에 실행되는 함수로, 인증, 로깅, 요청 데이터 파싱 등의 작업을 수행
*/

const express = require("express");
const fs = require("fs"); //파일시스템 모듈(파일, 디렉토리 읽기 쓰기 가능)
const path = require("path"); //node.js의 경로모듈 가져옴

const router = express.Router(); //라우터 객체 생성

const routeFiles = fs
  .readdirSync(__dirname) //현재 디렉토리에 있는 모든 파일 동기적으로 읽어 배열 반환
  //읽어온 파일 목록에서 index.js 파일 제외(해당 파일 자체를 라우터로 설정 안하기 위함)
  .filter((file) => file !== "index.js");

routeFiles.forEach((file) => {
  //현재 디렉토리 경로(__dirname)와 파일 이름(file)을 결합하여 파일의 전체 경로를 생성
  const routePath = path.join(__dirname, file);
  //해당 파일을 모듈(express 라우터 객체 내보냄)
  const route = require(routePath);
  //파일 이름을 기반으로 URL 경로를 설정 해당 경로에 라우터 매핑
  router.use(`/${path.basename(file, ".js")}`, route);
});

//생성된 라우터 객체를 모듈의 외부로 내보내기
module.exports = router;
