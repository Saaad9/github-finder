
console.log('안녕하세요');
console.log(123);
console.log(false);

var greeting = '안녕하세요';
console.log(greeting);
console.log({a : "a", b : "b"});

// 테이블 객체도 있음!
console.table({a : "a", b : "b"});

console.error("Error");

console.warn("Warning!")


// time 시작부터 끝까지 출력하는데 걸리는 시간을 계산할 수 있음
console.time('hello');
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.timeEnd('hello');


// 콘솔 로그를 정리
console.clear();