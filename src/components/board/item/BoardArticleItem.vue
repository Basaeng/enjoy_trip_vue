<script setup>
defineProps({
  article: {
    type: Object,
    default: () => ({
      articleNo: 0,
      memberId: '',
      subject: '',
      content: '',
      hit: 0
    })
  },
  comments: {
    type: Array
  }
})
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
        <button type="button" id="btn-list" class="btn mini btn-outline-primary mb-3">
          글목록
        </button>
        <!-- <%-- 					${loginedUser.memberId} ${article.memberId}
						${loginedUser.memberId eq  article.memberId} --%> -->
        <!-- <c:if test="${loginedUser.memberId eq  article.memberId }"> -->
        <button type="button" id="btn-mv-modify" class="btn mini btn-outline-success mb-3 ms-1">
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
          @click="showReplyForm(comment.commentId, $event)"
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
      <form id="reply-form" class="reply-form d-flex flex-column align-items-end">
        <input type="hidden" id="articleNo" name="articleNo" value="${article.articleNo}" />
        <input type="hidden" id="reply-article-no" />
        <input type="hidden" id="reply-parent-id" />
        <textarea
          class="form-control"
          id="reply-comment"
          rows="3"
          placeholder="답글을 입력하세요."
        ></textarea>
        <button type="submit" class="btn green mini">답글 등록</button>
      </form>
    </div>

    <!-- 댓글 작성 섹션 -->
    <div class="comment-write">
      <label for="comment" class="form-label">댓글</label>
      <form id="comment-form" class="d-flex flex-column align-items-end">
        <input type="hidden" id="articleNo" name="articleNo" value="${article.articleNo}" />
        <textarea
          class="form-control"
          id="comment"
          name="comment"
          placeholder="댓글을 입력하세요. 글자수는 3000자를 넘지 않아야 합니다."
          rows="4"
          maxlength="3000"
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
