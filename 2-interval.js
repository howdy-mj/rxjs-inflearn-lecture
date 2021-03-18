const Rx = require('rxjs');
const { take } = require('rxjs/operators');

const stream = Rx.interval(1000);

// stream.subscribe({
//   next: (data) => {
//     console.log(data);
//   },
// });

// stream
//   .pipe(
//     take(10) // 10개의 데이터만 받음
//   )
//   .subscribe({
//     next: (data) => {
//       console.log(data);
//     },
//   });

const makeTimer = Rx.timer(3000, 1000); // 3초 후에 1초 단위로 데이터 받기

makeTimer.pipe(take(5)).subscribe({
  next: (data) => console.log(data),
});
