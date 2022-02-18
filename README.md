
![image](https://user-images.githubusercontent.com/82519641/154723407-4b278e49-5324-4b0a-a2f3-8b0219de59a5.png)



<h1 align="middle">[과제] 에너지밸런스</h1>

 검색창을 어떻게 배치하고 소비자가 찾고자 하는 키워드를 입력하였을 때 제품을 어떠한 우선순위에 맞게 노출해줄지에 대한 로직을 세워볼 수 있을까요?
<br/>

# 🔗 배포




<br/>

# 📱 기술스택

<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img alt="react" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 

<img alt="styled-components" src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img alt="eslint" src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img alt="prettier" src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

<br/>

# ⚙️ 설치 및 시작하는 법

```
$ git clone https://github.com/pre-onboarding-course-team-6/3rd-week-hodoolabs.git

$ 3rd-week-hodoolabs

$ yarn i

$ yarn dev

http://localhost:3000/ 접속
```

<br/>

# 🧚‍♀️ 검색 최적화 로직 설계 Point 5 ✋
### 🌟 소비자가 원하는 제품을 보다 쉽게 찾을 수 있도록 설계가 목적
  ```
    Point01. 검색 입력창에 제품명, 브랜드명 모두 검색 가능
  ```  
  - 처음 검색할 때 아무거나 입력해도 검색결과에 나올수 있도록 설계
  - 한국어, 영어로 입력해도 검색 가능
  - ㅎㅅ, ㅋㅋ 등 초성으로 입력해도 검색 가능
  - '버타민' 같은 오타 입력시 -> '비타민'으로 올바르게 검색 가능

  ![image](https://user-images.githubusercontent.com/82519641/154726198-36980529-6874-46d3-be9e-f3dd713352fb.png)
  ```
    Point02. 검색창 하단으로 최근 검색어 및 자동완성 기능
  ```  
  - 처음 검색 할 때는 하단으로 자동완성 문자 나열 (10개까지)
  - 두번째 검색 할 때는 하단으로 검색기록 확인 가능
  - 검색기록으로 확인 된 문자 삭제 가능

![image](https://user-images.githubusercontent.com/82519641/154732293-2649bf2a-7063-485a-b9a2-fac4daa630b3.png)

  ```
    Point03. 더 세밀한 검색을 돕기 위한 브랜드 필터 / keywords 추천 / 검색결과 확인 가능
  ``` 
  - 제품명 or 브랜드명으로 검색시 좀 더 디테일한 검색결과를 보여주기 위해 브랜드를 선택해서 검색 가능하도록 기능 구현 (검색어와 브랜드 교집합)
  - 검색 없이 브랜드명으로만 먼저 검색 가능
  - 제품명, 브랜드명중 가장 많은 keyword로 검색 추천
  - 제품명, 브랜드명을 취합하여 가장 많은 단어로 추려 소비자에게 검색어 추천
  - 추천 키워드 옆 숫자 갯수 의미???????
  - ex)'코코' 검색시 검색결과 갯수, 검색문자 확인 가능 
  ```
    Point04. 서버 과부화 방지를 위한 Debounce / 무한 스크롤링
  ``` 
  - 서버 과부화 방지를 위한 검색어 입력 Debounce 처리 
  - 자동 검색어 기능 가능하면서 검색어 입력할 때는 Debounce 처리해서 한 번만 검색
  - 검색 했을 때 수많은 데이터가 나오면 검색결과가 늦게 나올 수 있어 60개씩 나눠 먼저 나온 후 소비자가 보기 편하게 나머지는 무한 스크롤링 
  - 우리에게 가장 익숙한 오름차순 정렬 
  ```
    Point5. 누가봐도 쉽게 사용 할 수 있게 직관적인 디자인
  ``` 
  - 누가 봐도 손쉽게 사용 할 수 있도록 기능을 숨기지 않고 밖으로 모두 노출
  - 클릭, 엔터 수를 줄이기 위해 검색창 hover해도 자동완성, 최근검색어 확인 가능
  - 브랜드명 검색은 의무적인 기능이 아니고 사용자가 선택 가능
  - 실제 홈페이지에 구현 할 때  모달 창으로 가능

  <br/><br/>

# 🏹 과제 구현 목록 및 담당
> ✨ 참고 링크 및 추가 안내 [Notion🔗](https://www.notion.so/minbr0ther/646973df27864ba6974e5de544bed4c6)
<hr/>

### [22_01 민무길](https://github.com/gilmujjang)

1. 검색창 작성, 검색기록 기능 구현
2. 자동완성, 검색기록 기능 구현
3. 검색 창 CSS 스타일 담당
4. 오류해결

### [22_01 정민형](https://github.com/minbr0ther)

1. 브랜드 선택 필터링 기능 구현
2. 검색 debounce 구현
3. 자동완성, 검색기록 기능 구현
4. 오류해결

### [22_01 김선명](https://github.com/BGM-109)

1. API 서버 담당
2. 무한 스크롤링 구현
3. 자동완성, 검색기록 기능 구현
4. 오류해결

### [22_01 이현명](https://github.com/wiseeee)

1. CSS 스타일 담당
2. 초기 세팅 담당
<br/>

<br/>

# 🏗 프로젝트 구조

```
src
 ┣ components
 ┃ ┣ Loading
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┗ styled.ts
 ┃ ┣ Search
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┗ styled.ts
 ┃ ┗ SelectBox
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┗ styled.ts
 ┣ hooks
 ┃ ┗ useDebounce.ts
 ┣ App.tsx
 ┣ index.tsx
 ┗ styled.ts
```
<br/>

## ✅ Git - Commit Message Convention [🔗](https://webruden.tistory.com/486)

- feat : 새로운 기능 추가 (a new feature)
- fix : 버그 수정 (a bug fix)
- docs : 문서 수정 (changes to documentation)
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 (formatting, missing semi colons, etc; no code change)
- refactor : 코드 리펙토링 (refactoring production code)
- test : 테스트 코드, 리펙토링 테스트 코드 추가 (adding tests, refactoring test; no production code change)
- chore : 빌드 업무 수정, 패키지 매니저 수정 (updating build tasks, package manager configs, etc; no production code change)
<br/>


## 👨‍👨‍👦‍👦 팀구성원 소개

| [<img src="https://github.com/minbr0ther.png" width="100px">](https://github.com/minbr0ther) | [<img src="https://github.com/BGM-109.png" width="100px">](https://github.com/BGM-109) | [<img src="https://github.com/wiseeee.png" width="100px">](https://github.com/wiseeee) | [<img src="https://github.com/gilmujjang.png" width="100px">](https://github.com/gilmujjang) |
| :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|                        [22_01 정민형](https://github.com/minbr0ther)                         |                       [22_01 김선명](https://github.com/BGM-109)                       |                       [22_01 이현명](https://github.com/wiseeee)                       |                        [22_01 민무길](https://github.com/gilmujjang)                         |
