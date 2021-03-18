const Rx = require('rxjs');
const { take, tap, filter, map, reduce } = require('rxjs/operators');

const stream = Rx.from([1, 2, 3, 4]);

// tap
// 데이터 추출 가능
// stream
//   .pipe(
//     tap((data) => {
//       console.log('한 번:', data);
//     }),
//     tap((data) => {
//       console.log('두 번: ', data);
//     })
//   )
//   .subscribe({
//     next: () => {},
//   });

// filter
// stream.pipe(filter((data) => data > 2)).subscribe(console.log);

// map
// stream
//   .pipe(
//     map((data) => data * 2), // 2 4 6 8
//     map((data) => data * 2) // 4 8 12 16
//   )
//   .subscribe(console.log);

// reduce
stream
  .pipe(
    reduce((acc, data) => {
      return acc + data;
    })
  )
  .subscribe(console.log);
