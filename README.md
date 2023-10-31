# Github Finder with vanilla javascript

## 프로젝트 설명

`github api`를 이용하여 유저아이디 검색시 **유저정보**와 **유저의 최근레포지터리**를 비동기적으로 불러오는 프로젝트 입니다.

## 프로젝트 구현내용
<img src="https://github.com/study-from-goorm/Project_GithubFinder_Develsopher/assets/78126381/e6b4cc3d-be98-491b-a8a7-fcdd6511cd79"  width="400" height="400"/>
<img src="https://github.com/study-from-goorm/Project_GithubFinder_Develsopher/assets/78126381/618f2eb2-517e-4b9e-9375-c55087ce7996"  width="500" height="400"/>

### 🎨UI 구성
- 전체적인 인터페이스는 **책 페이지넘김**하는 모습으로부터 영감을 받았습니다.
- 검색페이지에서 유저 닉네임검색을 하면 페이지 플립효과가 나타나면서 **유저정보** 및 **유저의 최근레포**를 표현하는 페이지를 등장시켰습니다.
- Alert 추가하여 유저에게 피드백을 주었습니다.
  - 존재하지 않는 유저검색시 피드백
  - API통신 실패시 피드백
- 검색시 로딩을 의미하는 spinner 구현
- 유저정보표시할때 유저가 등록하지 않은 정보는 null값대신 화면에 표현하지 않았습니다.
- 유저의 최근 레포지터리 7개까지 조회가 되며 정보가 없을시 별도의 fallback 메시지를 화면에 추가하였습니다.
- **다시 검색하기**버튼으로 새로고침없이 새로운 유저를 검색할 수 있습니다.

### 💻코드적 구현
- 클래스기반으로 **객체지향**으로 프로그래밍을 하였습니다.
- `유저정보api`, `유저의 레포지터리api` async,await를 활용해서 비동기 통신에 순서를 지정하였습니다.
- 비교적 간단한 구조여서 코드들을 모듈화하는 작업은 별도로 진행하지 않았습니다.

### 시연영상

https://github.com/study-from-goorm/Project_GithubFinder_Develsopher/assets/78126381/f78e8b0e-e15c-4c85-85f5-0b549dd5c0a4




### 배포주소
[Demo](https://capable-paprenjak-a23565.netlify.app/)
