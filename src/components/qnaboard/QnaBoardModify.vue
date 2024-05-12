<script setup>
import { Axios } from '@/util/http-common';
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// defineProps({
//   article: {
//     type: Object,
//     default: () => ({
//       articleNo: 0,
//       memberId: '',
//       subject: '',
//       content: '',
//       hit: 0
//     })
//   }
// })

onMounted(() => {
  getArticle()
})

const route = useRoute()
const router = useRouter()
const articleno = route.params.articleno

const article = ref('')

const http = Axios()
const getArticle = () => {
  http.get(`qna/article/${articleno}`).then(({ data }) => {
    console.log(data)
    article.value = data.article
    console.log(article.value)
  })
}

const modifyArticle = () => {
  const requestData = {
    subject: article.value.subject,
    content: article.value.content
  }
  http.put(`qna/article/${articleno}`, requestData)
  .then((response) => {
      console.log('게시글이 성공적으로 수정되었습니다.', response.data)
      alert('게시글이 성공적으로 수정되었습니다.')
      // 페이지를 변경합니다.
      router.replace({ 
          name: 'boardarticle',
          params: { articleno: articleno}
      })
    })
    .catch((error) => {
      console.error('게시글 수정 중 오류가 발생했습니다.', error)
    })
}

const golist = () => {
  router.push({ name: 'qnaboard' })
}

</script>

<template>
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글수정</mark>
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form id="form-modify" method="POST" @submit.prevent="modifyArticle">
          <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input
              type="text"
              class="form-control"
              id="subject"
              name="subject"
              v-model="article.subject"
            />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">내용 : </label>
            <textarea class="form-control" id="content" name="content" rows="7" v-model="article.content">
            </textarea>
          </div>
          <div class="col-auto text-center">
            <button type="submit" id="btn-modify" class="btn btn-outline-primary mb-3">
              글수정
            </button>
            <button type="button" id="btn-list" class="btn btn-outline-danger mb-3" @click="golist">
              목록으로이동...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
