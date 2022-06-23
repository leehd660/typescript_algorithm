export{};
//이렇게 export{}를 써주면 파일마다 다른 모듈로 인식하기 때문에 변수 선언에서 중복을 피할 수 있음.

const size: number = 123;
const isBig: boolean = size>=100;
const msg: string = isBig? '크다':'작다';

const values: number[] = [1,2,3];
//둘이 같은 타입임
const values2: Array<number> = [1,2,3];

//values.push('a');  -> 에러 발생
//values는 number 배열이기 때문에문자열 

//튜플로 배열과 비슷한데 인덱스마다 특정 타입을 설정할 수 있음
const data: [string, number] = [msg,size];
//js로 컴파일 시, 배열이나 튜플 같은 타입은 모두 object로 바뀜
//ts를 사용함으로써 더 다양한 타입들을 관리할 수 있음.

let v1:undefined = undefined;
let v2:null = null; // js에서는 object로 표현
//v1 = 123; -> 에러 발생 

let v3: undefined | number = undefined;
// | : 유니온타입으로 number 또는 undefined가 가능
v3 = 123;

//타입스크립트는 숫자나 문자도 타입으로 지정할 수 있음
let v4: 10|20|30;
v4 = 10;
//v4 = 15; -> 에러 발생
let v5:'경찰'|'소방관';
v5='경찰';
//v5 = '의사' -> 에러
//다음과 같이 union타입은 intersection타입과 함께 사용도 가능
let v6: (1|3|5) & (3|5|7);
//v1=1; -> 에러 발생


let value:any;
//any 타입은 모든 타입을 포함하는 타입.
//숫자나 문자 심지어 함수도 가능 
//js 프로젝트를 ts로 바꾸는 경우에 많이 사용
//타입을 알 수 없는 변수나 타입정의가 안된 외부패키지를 사용하는 경우에도 좋음
//any타입을 남용하면 ts의 의미 퇴색


//함수의 반환 타입으로 void와 never
//void : 아무것도 반환하지 않음.
function f1(): void {
    console.log('hello');
}
//never:예외가 발생해서 비정상적으로 종료되거나, 무한루프때문에 종료되지 않는 함수 반환 타입
function f2(): never {
    throw new Error('some error');
}
function f3(): never {
    while(true) {
        // ...
    }
}


//객체 타입 : object
let v:object;
v = { name: 'abc'};
// console.log(v.name); -> 에러가 발생함
//왜냐하면 객체의 속성에 대한 정보가 없기 때문에 특정 속성값에 접근하면 에러가 발생함
//이를 해결하기 위해서 인터페이스 사용


//type 키워드를 사용해서 타입에 별칭 가능
type Width = number |string;
let width:Width;
width = 100;
width = '100px';


//enum : js에 없고, ts에 있음.
enum Fruit {
    Apple,
    Banana = 5,
    Orange
}
//enum 변수와 안에 있는 아이템이 각각 타입으로 사용될 수 있음.
//또한 안에 있는 원소는 타입 뿐만 아니라 값으로도 사용가능
//enum의 각 원소에는 숫자 또는 문자열을 할당할 수 있는데, 명시적으로 값을 입력하지 않으면 이전 원소에서 1만큼 증가한 값이 할당 됨. orange는 6이됨.
//enum 타입의 각 원소는 이름과 값이 숫자면 양방향으로 매핑됨, 단 문자열 값이면 단방향으로만 가능
const e1:Fruit = Fruit.Apple;
const e2:Fruit.Apple|Fruit.Banana = Fruit.Banana;
console.log(e1); 
console.log(Fruit.Banana);
console.log(Fruit['Banana']);
console.log(Fruit[5]);
//그냥 enum을 사용하면 컴파일 후에 enum객체가 남아 있음 -> 이런 경우 번들 파일이 불필요하게 커질 수 있음.
//그렇기 때문에 enum객체에 접근하지 않는다면, const enum을 이용해서 컴파일 결과에 enum의 객체를 남기지 않을 수 있다. 사용한 값만 노출됨.

//함수의 타입
//매개변수 옆에 ?를 쓰면 선택매개변수(optional parameter)가 됨. 있어도 되고 없어도 된다는 의미 ->undefined가 되기도 함
//optional parameter는 맨 뒤에 적어라
//매개변수의 개수가 많은 경우 -> named parameter(뒤에서 설명)
// function getText(name:string, age:number, language?:string, ...rest:number[]): string {
function getText(name:string, age:number, language?:string): string {
    const nameText = name.substring(0,10);
    const ageText = age >= 35 ? 'senior':'junior';
    return `name: ${nameText}, age: ${ageText}`;
}
console.log(getText("heedo",25));