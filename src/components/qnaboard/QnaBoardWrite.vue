<script setup>
import { Axios } from '@/util/http-common'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const subject = ref('')
const content = ref('')
const http = Axios()
const router = useRouter()
const writeArticle = () => {
  const requestData = {
    subject: subject.value,
    content: content.value
  }
  http
    .post('/qna/article', requestData)
    .then((response) => {
      console.log('게시글이 성공적으로 등록되었습니다.', response.data)
      alert('게시글이 성공적으로 등록되었습니다.')
      // 페이지를 변경합니다.
      router.replace({ name: 'qnaboardlist' })
    })
    .catch((error) => {
      console.error('게시글 등록 중 오류가 발생했습니다.', error)
    })
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">질문 남기기</mark>
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form id="form-register" method="POST" @submit.prevent="writeArticle">
          <input type="hidden" name="action" value="write" />
          <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input
              type="text"
              class="form-control"
              id="subject"
              name="subject"
              placeholder="제목..."
              v-model="subject"
            />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">내용 : </label>
            <textarea
              class="form-control"
              id="content"
              name="content"
              rows="7"
              v-model="content"
            ></textarea>
          </div>
          <div class="col-auto text-center">
            <button type="submit" id="btn-register" class="btn btn-outline-primary mb-3">
              글작성
            </button>
            <button type="reset" class="btn btn-outline-danger mb-3">초기화</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
