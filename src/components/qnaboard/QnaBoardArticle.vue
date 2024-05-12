<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BoardArticleItem from './item/QnaBoardArticleItem.vue'

const route = useRoute()
const articleno = ref(route.params.articleno)
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">질문보기</mark>
        </h2>
      </div>
      <!-- <BoardArticleItem :article="article" :comments="comments" /> -->
      <BoardArticleItem :articleno="articleno" />
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
