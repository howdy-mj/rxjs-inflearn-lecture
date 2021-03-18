/**
 * 10초에 한 번씩 주식 거래 시작
 *
 * 한 번의 주식 거래에서는 1000번의 API call이 수행
 * 1000번의 API call을 함에 있어서, 동시 요청은 10회 이하로 제한
 * 10회의 요청이 끝날 때마다 5초 간 휴식
 *
 * 1000번의 요청 중 에러가 발생하면 요청을 다시 시작하되 최대 2번 까지 반복
 * (물론 동시 요청 10회 이하의 조건은 만족해야 함)
 *
 * 주식 거래를 성공한 뒤에는 10개 씩 나누어 결과를 저장하되, 주식 거래 행위에 영향을 주지 않도록 비동기로 저장
 */

const { default: Axios } = require('axios');
const { of, interval, from, range } = require('rxjs');
const {
  delay,
  map,
  mergeAll,
  reduce,
  bufferCount,
  mergeMap,
} = require('rxjs/operators');

// $는 observable을 반환한다는 규칙
function startTrade$(tradeNumber) {
  // 0-999번 째까지 진행
  return range(0, 1000).pipe(
    map(() => apiCall$().pipe(delay(5))), // 5초간 휴식
    mergeAll(10), // 10개 씩 묶음
    retry(2), // 2번 재시도
    reduce((accu, data) => {
      return tradeNumber; // 하나로 압축해서, 이 결과를 반환
    })
  );
}

function apiCall$() {
  return from(Axios.get('https://naver.com'));
}

function saveResult$() {
  /**
   * ..fs.write
   * ... 데이터베이스 입출력
   */
}

interval(10 * 1000).pipe(
  mergeMap((tradeNumber) => startTrade$(tradeNumber)),
  bufferCount(10), // 10번의 거래를 쌓이게
  mergeMap((results) => saveResult$(results))
);
