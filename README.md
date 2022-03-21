
![image](https://user-images.githubusercontent.com/82519641/154723407-4b278e49-5324-4b0a-a2f3-8b0219de59a5.png)


<h1 align="middle">쉽게 검색하기 위한 로직</h1>

<br/>

 검색창을 어떻게 배치하고 소비자가 찾고자 하는 키워드를 입력하였을 때 제품을 어떠한 우선순위에 맞게 노출해줄지에 대한 로직을 세워볼 수 있을까요?

<br/>

# 🔗 배포

https://cocky-edison-1b96cb.netlify.app

<br/>

# 📱 기술스택

<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img alt="react" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 

<img alt="styled-components" src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img alt="eslint" src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img alt="prettier" src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

<br/>



# 🧚‍♀️ 검색 최적화 로직 설계 Point 5 ✋
### ⛳️ 소비자가 원하는 제품을 보다 쉽게 찾을 수 있도록 설계가 목적
  
<img src="https://user-images.githubusercontent.com/24728385/154776511-8549f1e4-991f-4aac-b0f4-338fd2f14e67.png" width="100%" />
  
 ## ⭐️ Point01. 검색 입력창에 제품명, 브랜드명 모두 검색 가능
   
  - 처음 검색할 때 아무거나 입력해도 검색결과에 나올수 있도록 설계
  - 한국어, 영어로 입력해도 검색 가능
  - ㅎㅅ, ㅋㅋ 등 초성으로 입력해도 검색 가능
  - '버타민' 같은 오타 입력시 -> '비타민'으로 올바르게 검색 가능

<br/>
<hr/>

<img src="https://user-images.githubusercontent.com/82519641/154726198-36980529-6874-46d3-be9e-f3dd713352fb.png" width="100%" />

  ## ⭐️ Point02. 검색창 하단으로 최근 검색어 및 자동완성 기능

  - 처음 검색 할 때는 하단으로 자동완성 문자 나열 (10개까지)
  - 두번째 검색 할 때는 하단으로 검색기록 확인 가능
  - 검색기록 옆의 X 버튼으로 삭제 가능

<br/>
<hr/>

<img src="https://user-images.githubusercontent.com/24728385/154777167-613bd1a9-a1c1-463f-893b-296707af6761.png" width="100%" />
<img src="https://user-images.githubusercontent.com/24728385/154777143-9508ccda-1ddc-4ca2-a5b3-c17b97bdbea1.png" width="100%" />

  ## ⭐️ Point03. 더 세밀한 검색을 돕기 위한 브랜드 필터 / keywords 추천 / 검색결과 확인 가능
  - 좀 더 디테일한 검색결과를 보여주기 위해 브랜드를 옵션으로 선택해서 검색 가능하도록 기능 구현 (검색어와 브랜드 교집합)
  - 검색 없이 브랜드명으로만 먼저 검색 가능
  - 제품명, 브랜드명중 가장 많은 keyword로 검색 추천
  - 제품명, 브랜드명을 취합하여 가장 많은 단어로 추려 소비자에게 검색어 추천
  - ex)'코코' 검색시 검색결과 갯수, 검색문자 확인 가능 

<br/>
<hr/>

 ## ⭐️ Point04. 서버 과부화 방지를 위한 Debounce / 무한 스크롤링
  - 서버 과부화 방지를 위한 검색어 입력 Debounce 처리 
  - 마지막 입력 후 0.5동안 입력이 없으면 Debounce 처리해서 한 번만 검색
  - 최대 60개씩 보여주고 스크롤이 리스트에 끝에 도달하면 추가적으로 데이터 로드
  - 우리에게 가장 익숙한 오름차순 정렬 

<br/>
<hr/>

  ## ⭐️ Point5. 누가봐도 쉽게 사용 할 수 있게 직관적인 디자인 
  - 누가 봐도 손쉽게 사용 할 수 있도록 기능을 숨기지 않고 밖으로 모두 노출
  - 클릭, 엔터 수를 줄이기 위해 검색창 hover해도 자동완성, 최근검색어 확인 가능
  - 추후 업데이트로 검색결과 리스트 중 클릭시 제품 정보를 모달 창으로 보여줄 수 있음

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
# ⚙️ 설치 및 시작하는 법

```
$ git clone https://github.com/wiseeee/3rd-week-energybalance.git

$ cd 3rd-week-energybalance

$ yarn i 혹은 npm i

http://localhost:3000/ 접속
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

