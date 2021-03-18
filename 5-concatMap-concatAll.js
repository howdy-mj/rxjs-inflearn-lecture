const Rx = require('rxjs');
const {
  take,
  tap,
  filter,
  map,
  reduce,
  concatMap,
  concatAll,
  mergeMap,
  mergeAll,
} = require('rxjs/operators');

// concat
// const stream = Rx.from(['택배1', '택배2', '택배3']);

// map
const stream = Rx.interval(1000).pipe(map((data) => `택배${data + 1}`));

// concat
// 하나 씩 처리
// concat (map)
function openBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, ' 상품 개봉');
      resolve(data);
    }, 5000);
  });
}

function checkBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, ' 상품 검사');
      resolve(data);
    }, 5000);
  });
}

function useProduct(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, ' 상품 사용');
      resolve(data);
    }, 5000);
  });
}

async function userTask(data) {
  // Promise 반환
  await openBox(data);
  await checkBox(data);
  await useProduct(data);
}

// stream
//   .pipe(
//     concatMap((data) => Rx.from(userTask(data))) // observable 형태
//   )
//   .subscribe();

// concat (all)
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream3 = Rx.interval(1000).pipe(take(3), tap(console.log));

const stream4 = Rx.of(stream2, stream3);

// stream4
//   .pipe(
//     concatAll() // 여러 개의 observable이 순차적으로 종료되고 이어붙이는 역할
//   )
//   .subscribe(console.log);

// merge
// 병렬로 처리
// merge (map)
// stream.pipe(mergeMap((data) => Rx.from(userTask(data)))).subscribe();

// merge (all)
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream6 = Rx.interval(1000).pipe(take(3), tap(console.log));

const stream7 = Rx.of(stream5, stream6);

stream7.pipe(mergeAll()).subscribe();
