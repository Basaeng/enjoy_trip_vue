<script setup>
import { Axios } from '@/util/http-common'
import { onMounted, ref } from 'vue'
import BoardListItem from '@/components/board/item/BoardListItem.vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  getBoardList()
})

const http = Axios()
const router = useRouter()
const articles = ref()

const getBoardList = () => {
  http.get('/api/list').then(({ data }) => {
    console.log(data)
    articles.value = data.articles
  })
}

const moveWriteForm = () => {
  router.push({ name: 'boardwrite' })
}

const key = ref('')
const word = ref('')

const search = () => {
  http
    .get('/api/list', {
      params: {
        key: key.value,
        word: word.value
      }
    })
    .then(({ data }) => {
      console.log('검색 완료.', data)
      key.value = ''
      word.value = ''
      articles.value = data.articles
    })
    .catch((error) => {
      console.log('검색 중 오류가 발생했습니다', error)
    })
}
</script>

<template>
  <body>
    <!-- 메인 -->
    <div class="container" id="list-container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <h2 class="my-3 py-3 shadow-sm bg-light text-center">
            <mark class="sky">글목록</mark>
          </h2>
        </div>
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="row align-self-center mb-2">
            <div class="col-md-2 text-start">
              <button
                type="button"
                @click="moveWriteForm"
                id="btn-mv-register"
                class="btn btn-outline-primary btn-sm"
              >
                글쓰기
              </button>
            </div>
            <div class="col-md-7 offset-3">
              <form id="form-search" class="d-flex" method="GET" @submit.prevent="search">
                <input type="hidden" name="pgno" value="1" />
                <select
                  id="key"
                  name="key"
                  class="form-select form-select-sm ms-5 me-1 w-50"
                  aria-label="검색조건"
                  v-model="key"
                >
                  <option value="" selected>검색조건</option>
                  <option value="article_no">글번호</option>
                  <option value="subject">제목</option>
                  <option value="member_id">작성자</option>
                </select>
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control"
                    name="word"
                    placeholder="검색어..."
                    v-model="word"
                  />
                  <button class="btn btn-dark" type="submit">검색</button>
                </div>
              </form>
            </div>
          </div>

          <!-- BoardListArticle -->
          <BoardListItem :articles="articles" />
        </div>
        <!-- <div class="row">${navigation.navigator}</div> -->
      </div>
    </div>
    <form id="form-param" method="get" action="">
      <input type="hidden" id="p-pgno" name="pgno" value="" />
      <input type="hidden" id="p-key" name="key" value="" />
      <input type="hidden" id="p-word" name="word" value="" />
    </form>
  </body>
</template>

<style scoped>
/* board 패키지에서 컨테이너 영역 잡는 css */
.container {
  margin-top: 150px; /* 상단 마진 설정 */
  margin-bottom: 300px; /* 하단 마진 설정 */
  padding: 20px; /* 내부 컨텐츠와의 공간을 위해 패딩 설정 가능 */
}

@media (max-width: 600px) {
  .container {
    margin-top: 20px; /* 모바일 화면에서의 상단 마진 설정 */
    margin-bottom: 20px; /* 모바일 화면에서의 하단 마진 설정 */
    padding: 10px;
  }
}

article-title {
  text-decoration: none;
}

/* 전체 조회 컨테이너 */
#list-container {
  margin-top: 150px; /* 상단 마진 설정 */
  margin-bottom: 100px; /* 하단 마진 설정 */
  padding: 20px; /* 내부 컨텐츠와의 공간을 위해 패딩 설정 가능 */
}

html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
