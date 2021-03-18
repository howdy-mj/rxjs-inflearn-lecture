/**
복잡한 택배 시스템
1000개의 택배가 1초에 한 번씩 배송
택배를 받으면 그 즉시 아래의 작업을 실행

1. 상품 개봉 (3초)
2. 상품 검사 (3초)
3. 상품 사용 (3초)

이때 택배 회사에는 종업원이 3명 밖에 없기 때문에, 위 작업은 최대 3명에 의해 동시에 실행될 수 있음
즉, 동시에 4개 이상의 작업은 불가

각 택배들에 대해서 상품 사용까지 종료된 택배들을 10개씩 묶어 공항으로 보냄 
 */

const { of, interval, from, pipe } = require('rxjs');
const {
  delay,
  tap,
  take,
  concatAll,
  map,
  mergeAll,
  reduce,
  bufferCount,
} = require('rxjs/operators');

function openBox(delivery) {
  return of(delivery).pipe(
    delay(3000), // 3초 소요
    tap((delivery) => console.log(delivery + '를 열었습니다.')) // 끝난 후
  );
}

function checkProduct(delivery) {
  return of(delivery).pipe(
    delay(3000), // 3초 소요
    tap((delivery) => console.log(delivery + '를 검사했습니다.')) // 끝난 후
  );
}

function userProduct(delivery) {
  return of(delivery).pipe(
    delay(3000), // 3초 소요
    tap((delivery) => console.log(delivery + '를 사용했습니다.')) // 끝난 후
  );
}

function doTask(delivery) {
  const tasks = from([
    openBox(delivery),
    checkProduct(delivery),
    userProduct(delivery),
  ]);
  return tasks.pipe(
    concatAll(), // 순차적으로 실행
    reduce((acc, data) => {
      return delivery;
    }) // 축약시켜서 한 번만 결과를 알려주는
  );
}

const deliveries = interval(1000).pipe(take(1000));

function sendToAirport() {}

deliveries
  .pipe(
    map((delivery) => doTask(delivery)),
    mergeAll(3),
    bufferCount(10), // 앞 단계에서 방출된 것이 10개가 쌓이면 하나로 묶어서 다음 파이프로 보내줌
    // delay(1000), // 한 텀 쉬고
    tap((tenDeliveries) => sendToAirport(tenDeliveries))
  )
  .subscribe();
