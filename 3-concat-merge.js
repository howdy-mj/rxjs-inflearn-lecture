const Rx = require('rxjs');
const { take } = require('rxjs/operators');

const stream1 = Rx.from([1, 2, 3, 4, 5]);
const stream2 = Rx.from([6, 7, 8, 9, 10]);

const stream3 = Rx.interval(1000).pipe(take(2));
const stream4 = Rx.interval(1000).pipe(take(2));

// concat
// 두 개의 데이터 스트림을 순차적으로 처리 하는 것
// Rx.concat(stream1, stream2).subscribe({
//   next: console.log,
// });

// Rx.concat(stream3, stream4).subscribe(console.log);

// merge
// 두 개의 데이터 스트림을 병렬 처리하는 것
Rx.merge(stream3, stream4).subscribe(console.log);
