<script setup>
import { Axios } from '@/util/http-common'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  articleno: Number
})

const article = ref('')
const comments = ref('')
const http = Axios()
const getArticle = () => {
  http.get(`api/article/${props.articleno}`).then(({ data }) => {
    console.log(data)
    article.value = data.article
    comments.value = data.comments
    console.log(article.value)
    console.log(comments.value)
  })
}
watchEffect(() => {
  getArticle()
})
const router = useRouter()

const golist = () => {
  router.push({ name: 'board' })
}

const showReplyForm = (commentId, buttonElement) => {
  ////답글 버튼의 DOM 참조
  // 답글 폼의 위치를 결정하고 표시하기
  var commentElement = buttonElement.closest('.comment') //가까운 부모 .comment로 찾아서 다음에 폼 표시
  var replyFormContainer = document.getElementById('reply-form-container')
  commentElement.after(replyFormContainer) //commentElement 뒤에 replyFormContainer를 삽입한다.

  // 답글 폼에 필요한 데이터 설정하기
  document.getElementById('reply-article-no').value = buttonElement.dataset.articleNo
  document.getElementById('reply-parent-id').value = buttonElement.dataset.parentId
  document.getElementById('reply-comment').value = '' // 댓글 입력란 비우기

  // 답글 폼 표시
  replyFormContainer.style.display = 'block'
}

// 댓글, 대댓글 등록 동적변수
const commentContent = ref('')
const replyContent = ref('')

// 댓글등록
const registComment = (articleNo) => {
  console.log(articleNo)
  console.log(commentContent.value)
  const requestData = {
    comment: commentContent.value,
    articleNo: articleNo
  }
  http
    .post('/api/comment', requestData)
    .then(({ data }) => {
      console.log('댓글이 성공적으로 등록되었습니다.', data)
      alert('댓글이 성공적으로 등록되었습니다.')
      // 페이지를 변경합니다.
    })
    .then(() => {
      getArticle()
      router.push(router.currentRoute)
    })
    .catch((error) => {
      console.error('댓글 등록 중 오류가 발생했습니다.', error)
    })
}

// 대댓글 등록
const registReply = () => {
  var articleNo = document.getElementById('reply-article-no').value
  var parentId = document.getElementById('reply-parent-id').value
  var comment = document.getElementById('reply-comment').value // 댓글 내용 가져오기

  const requestData = {
    comment,
    parentId,
    articleNo
  }
  http
    .post('/api/comment', requestData)
    .then(({ data }) => {
      console.log('댓글이 성공적으로 등록되었습니다.', data)
      alert('댓글이 성공적으로 등록되었습니다.')
      // 페이지를 변경합니다.
    })
    .then(() => {
      getArticle()
      router.push(router.currentRoute)
    })
    .catch((error) => {
      console.error('댓글 등록 중 오류가 발생했습니다.', error)
    })
}

const moveModify = () => {
  const { articleNo } = article.value
  router.push({
    name: 'boardmodify',
    params: {
      articleNo: articleNo
    }
  })
}
</script>

<template>
  <div class="col-lg-8 col-md-10 col-sm-12">
    <div class="row my-2">
      <h2 class="text-secondary px-5">{{ article.subject }}</h2>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="clearfix align-content-center">
          <img
            class="avatar me-2 float-md-start bg-light p-2"
            src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
          />
          <p>
            <span class="fw-bold">{{ article.memberId }}</span> <br />
            <span class="text-secondary fw-light">
              {{ article.registerTime }} 조회 : {{ article.hit }}
            </span>
          </p>
        </div>
      </div>
      <!-- 					<div class="col-md-4 align-self-center text-end">댓글 : 0</div> -->
      <div class="divider mb-3"></div>
      <div class="text-secondary">{{ article.content }}</div>
      <div class="divider mt-3 mb-3"></div>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          @click="golist"
          id="btn-list"
          class="btn mini btn-outline-primary mb-3"
        >
          글목록
        </button>

        <!-- 로그인한 유저와 게시글 유저의 아이디가 같다면 선택 가능한 메뉴  -->
        <!-- 로그인 구현 이후 수정 필요 -->
        <!-- <%-- 					${loginedUser.memberId} ${article.memberId}
						${loginedUser.memberId eq  article.memberId} --%> -->
        <!-- <c:if test="${loginedUser.memberId eq  article.memberId }"> -->
        <button
          type="button"
          id="btn-mv-modify"
          class="btn mini btn-outline-success mb-3 ms-1"
          @click="moveModify"
        >
          글수정
        </button>
        <button type="button" id="btn-delete" class="btn mini btn-outline-danger mb-3 ms-1">
          글삭제
        </button>
        <!-- </c:if> -->
      </div>
    </div>
    <!-- 댓글 목록 -->
    <div id="comment-list" v-for="comment in comments" :key="comment.commentId">
      <!-- 댓글 항목 -->
      <hr />
      <div
        class="comment"
        :style="{ 'margin-left': comment.depth * 20 + 'px' }"
        :data-comment-id="comment.commentId"
      >
        <div class="d-flex justify-content-between">
          <!-- 댓글 내용 -->
          <div class="comment-body">
            <div class="comment-author">{{ comment.memberId }}</div>
            <div class="comment-text">{{ comment.comment }}</div>
            <div class="comment-date">{{ comment.registTime }}</div>
          </div>
          <!-- 드롭다운 메뉴 트리거 -->
          <!-- <c:if test="${ loginedUser.memberId eq  comment.memberId }"> -->
          <div class="dropdown btn-group dropstart">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton${comment.commentId}"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="border: none"
            ></button>
            <ul
              class="dropdown-menu"
              style="border: none"
              aria-labelledby="dropdownMenuButton${comment.commentId} "
            >
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="editComment(${comment.commentId}); return false;"
                  >수정</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  onclick="deleteComment(${comment.commentId}); return false;"
                  >삭제</a
                >
              </li>
            </ul>
          </div>
          <!-- </c:if> -->
        </div>

        <!-- 답글 버튼 -->
        <button
          v-if="comment.depth === 0"
          type="button"
          class="btn-reply btn mini yellow mb-3 ms-1"
          @click="showReplyForm(comment.commentId, $event.target)"
          :data-article-no="article.articleNo"
          :data-parent-id="comment.commentId"
        >
          답글
        </button>

        <!-- <c:if test="${comment.depth == 0}"> -->

        <!-- <button type="button" class="btn-reply btn mini yellow mb-3 ms-1"
								onclick="showReplyForm(${comment.commentId}, this)"
								data-article-no="${article.articleNo}"
								data-parent-id="${comment.commentId}">답글</button> -->
        <!-- </c:if> -->
        <!-- <%-- 추후 멘션 기능 추가 --%> -->
      </div>
      <!-- <hr> -->
    </div>

    <!-- 대댓글 작성 폼 -->
    <div id="reply-form-container" style="display: none">
      <form
        id="reply-form"
        class="reply-form d-flex flex-column align-items-end"
        @submit.prevent="registReply"
      >
        <input type="hidden" id="articleNo" name="articleNo" :value="article.articleNo" />
        <input type="hidden" id="reply-article-no" />
        <input type="hidden" id="reply-parent-id" />
        <textarea
          class="form-control"
          id="reply-comment"
          rows="3"
          placeholder="답글을 입력하세요."
          v-model="replyContent"
        ></textarea>
        <button type="submit" class="btn green mini">답글 등록</button>
      </form>
    </div>

    <!-- 댓글 작성 섹션 -->
    <div class="comment-write">
      <label for="comment" class="form-label">댓글</label>
      <form
        id="comment-form"
        @submit.prevent="registComment(article.articleNo)"
        class="d-flex flex-column align-items-end"
      >
        <input type="hidden" id="articleNo" name="articleNo" :value="article.articleNo" />
        <textarea
          class="form-control"
          id="comment"
          name="comment"
          placeholder="댓글을 입력하세요. 글자수는 3000자를 넘지 않아야 합니다."
          rows="4"
          maxlength="3000"
          v-model="commentContent"
        ></textarea>
        <div class="d-flex justify-content-between align-items-center">
          <button type="submit" class="btn green mini">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btn-reply {
  margin-left: auto; /* 부모 요소의 오른쪽 끝으로 이동 */
}

.btn.mini {
  margin: 9px;
  padding: 4px 12px;
  font-size: 12px;
}

.btn.green {
  color: white;
  background-color: #9abf7f;
  box-shadow: 0px 4px 0px #87a86f;
}

.btn.green:active {
  box-shadow: 0 0 #87a86f;
  background-color: #87a86f;
}

.btn.yellow {
  background-color: #f0d264;
  box-shadow: 0px 4px 0px #d1b757;
}

.btn.yellow:active {
  box-shadow: 0 0 #87a86f;
  background-color: #f0d264;
}

.color.yellow {
  background: #f0d264;
}

.btn.yellow:active {
  box-shadow: 0 0 #ff4c4b;
}

/* 댓글 영역 */
.comment-item {
  margin-bottom: 10px;
  padding: 10px;
}

.comment-meta {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 5px;
}

.comment-author {
  font-weight: bold;
}

.comment-reply-to {
  color: #007bff;
  margin-left: 5px;
}

.comment-date {
  display: block;
  font-size: 0.75rem;
  color: #aaa;
}

.comment-body {
  font-size: 0.875rem;
  margin-bottom: 10px;
}

.comment-actions .reply-button {
  font-size: 0.75rem;
  margin-top: 5px;
}

.comment-write {
  margin-top: 30px;
  margin-bottom: 30px;
}

.comment-write .form-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.comment-write .btn.green.mini {
  margin-top: 10px;
}

/* 드롭다운 메뉴 스타일 */
.dropdown-menu a {
  font-size: 0.8rem; /* 글씨 크기를 줄입니다 */
  color: #333; /* 글씨 색상을 지정합니다 */
  text-align: center; /* 텍스트를 중앙 정렬합니다 */
  padding: 5px 10px; /* 상하 좌우 패딩을 조정하여 항목 크기를 조절합니다 */
}

/* 드롭다운 메뉴 항목 호버 스타일 */
.dropdown-menu a:hover {
  background-color: #f8f9fa; /* 호버 시 배경색 변경 */
  color: #0056b3; /* 호버 시 글씨 색상 변경 */
}

/* 드롭다운 메뉴 위치와 관련된 스타일을 보정합니다 */
.dropdown {
  position: relative;
}

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
