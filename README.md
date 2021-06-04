# Node 로 댓글관련 API 만들기
> 댓글과 대댓글 좋아요와 싫어요 기능이 있는 API 프로젝트입니다  
  
## 설치 방법

OS X & 리눅스:
1. Clone the repo
```sh
git clone https://github.com/jungwonJung/Node-Comment-API.git
```
2.  Install NPM packages 
```
npm init
```
3. install dependencies Modules
```
npm install
```  
  
## 실행 방법

OS X & 리눅스:
1. Change Directory
```sh
cd jungwon_mission
```
2.  start app.js
```
node app.js
```

## DB연결방법  

DB 는 MongoDB Cloud 서버를 사용했으며
setting_example.txt 에 
setting.env 파일 내용을 예시로 적어두었으며
연결하기위해선 setting.env 사용할 MongoDB Cloud 주소를 설정해주면된다  

## DB Schema 정리  
```
User(userSchema) 
accountEmail = 회원이메일
accountName = 회원이름
accountPw = 회원비밀번호
created = 생성날짜(timestamp 를 사용하여 더길게 저장되지만 최대로 줄이기위해 다른스타일로 날짜 저장)  
updated = 수정날짜    

{  
"_id":{"$oid":"60b9b154fc9f4504a3617f5e"},  
"accountEmail":"wjdwjd1501@gmail.com",  
"accountPw":"$2a$10$LHPJowiLqUkfDBG1mXgsJ.fIzS37Cu5fday4U66pQS5W5DigBFOjK","accountName":"정정원",  
"created":{"$numberDouble":"1622782292276.0"},  
"updated":{"$numberDouble":"1622782292277.0"}  
}
```  
```
Comment(commentSchema)
userId = User를 populate받는다
parentComment = 대댓글인경우 대댓글이 달린 댓글의 정보 
reComment = 대댓글이 달린경우 달린 대댓글에 대한 정보
text = 댓글의 내용
isDeleted = 삭제가되는경우 실제로 삭제하지않고 isDeleted 를 true 로 바꾸고 find 시 false 만 조회
isLiked = 해당 코멘트에 좋아요가 눌리는경우 +1 이 된다, 해제하면 -1
isHated = 해당 코멘트에 싫어요가 눌리는경우 +1 이 된다, 해제하면 -1


기본형식

{
"parentComment": null,
"reComment": null,
"isDeleted": false,
"isLiked": 0,
"isHated": 0,
"_id": "60b9b19efc9f4504a3617f61",
    "userId": { // 작성자 정보
        "_id": "60b9b154fc9f4504a3617f5e",
        "accountName": "정정원",
        "created": 1622782292276,
        "updated": 1622782292277
        },
"text": "테스트 용 댓글 2",
"created": 1622782366390,
}

대댓글이있는경우

{
"parentComment": null,
"reComment": { // 대댓글정보
    "_id": "60b9b27cba51b204cb399435",
        "userId": { // 대댓글 작성자정보
        "_id": "60b9b163fc9f4504a3617f5f",
        "accountName": "덕구",
        "created": 1622782307943,
        "updated": 1622782307943
            },
        "text": "대댓글 테스트 456", // 대댓글내용
        "created": 1622782588827
      },
"isDeleted": false,
"isLiked": 0,
"isHated": 0,
    "_id": "60b9b196fc9f4504a3617f60", // 댓글 Id
      "userId": { // 댓글 작성자 정보
        "_id": "60b9b154fc9f4504a3617f5e",
        "accountName": "정정원",
        "created": 1622782292276,
        "updated": 1622782292277
    },

대댓글의 내용

"parentComment": "60b9b196fc9f4504a3617f60", // 대댓글이 달려진 댓글의 id
"reComment": null,
"isDeleted": false,
"isLiked": 0,
"isHated": -,
"_id": "60b9b27cba51b204cb399435", // 대댓글 id
    "userId": {  // 대댓글 작성한 user의 정보
        "_id": "60b9b163fc9f4504a3617f5f",
        "accountName": "덕구",
        "created": 1622782307943,
        "updated": 1622782307943
},
"text": "대댓글 테스트 456",
"created": 1622782588827,
```
```
like(hate)
user = 좋아요한 user의 정보 (토큰인증)
boadrd = 좋아요한 comment 의 정보

예시

"_id": "60b9bead7293b1081e5dc012",  // 좋아요나 싫어요 data 의 고유 id
"user": "60b9b163fc9f4504a3617f5f", // 좋아요나 싫어요 한 user의 id
"board": "60b9b196fc9f4504a3617f60", // 누른 코멘트나 대댓글의 id
```
## 사용 모듈
- bcrypt
- body-parser
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- mongoose-paginate-v2
- nodemon
- swagger-jsdoc
- swagger-ui-express  

  
## 정보

My Portfolio – [@노션](https://www.notion.so/Hello-I-m-Louis-6ec5e3f6bde04aa89dd19509654ef465)  
My Email – wjdros1501@gmail.com  
My Blog– [@블로그](https://ganzicoder.tistory.com/)  
My Github–[https://github.com/JUNGganzi/](https://github.com/JUNGganzi)