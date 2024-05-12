<script setup>
import { Axios } from '@/util/http-common'
import { RouterLink, RouterView } from 'vue-router'

const http = Axios()
const apiurl = import.meta.env.VITE_MAIN_URL
</script>

<template>
  <div id="header">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top navbar-custom"
      style="padding-bottom: 2px; padding-top: 0px"
    >
      <div class="container-fluid navbar-custom">
        <!-- 로고 중앙에 배치 -->
        <div class="navbar-brand-center">
          <a
            class="navbar-brand fw-bold"
            :href="apiurl"
            style="padding-bottom: 0; padding-top: 20px"
            >EnjoyTrip!</a
          >
        </div>
        <!-- 토글 버튼 -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 네비게이션 링크 컨테이너 -->
        <div class="navbar-nav-container collapse navbar-collapse" id="navbarContent">
          <!-- 관광지 관련 링크 -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'trip' }">지역별 관광지</router-link>
            </li>

            <!-- 로그인 상태에 따른 링크 렌더링 -->
            <!-- 잠시 보류 -->
            <!-- <c:if test="${not empty loginedUser}"> -->
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="tripPlan">나의여행계획</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">핫플자랑하기</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/board/list">여행정보공유</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/qnaboard/list">Q&A</a>
            </li>
            <!-- </c:if> -->
          </ul>

          <!-- 회원 관련 링크 -->
          <ul class="navbar-nav">
            <!-- <c:choose>
              <c:when test="${empty loginedUser}">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="joinForm">회원가입</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    aria-current="page"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    >로그인</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="updatePwdForm">비밀번호 변경</a>
                </li>
              </c:when>
              <c:otherwise>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="logout">로그아웃</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="mypageForm">마이페이지</a>
                </li>
              </c:otherwise>
            </c:choose> -->
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="logout">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="mypageForm">마이페이지</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <!-- 비밀번호 찾기 모달 -->
  <div class="modal fade" id="forgotPasswordModal" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="d-flex justify-content-center"></div>
        <div class="modal-body">
          <!-- 입력 폼 -->
          <form id="forgotPasswordForm" action="member.do?action=findPassword" method="post">
            <div class="form-group">
              <label for="forgotId"></label>
              <input
                class="form-control"
                id="forgotId"
                name="forgotId"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div class="mt-3 d-flex justify-content-center">
              <button type="submit" class="btn btn-success">비밀번호 찾기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- 비밀번호 찾기 모달 끝 -->

  <!-- 로그인 모달 -->
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="d-flex justify-content-center">
          <div>
            <h4>로그인</h4>
          </div>
        </div>

        <!-- 입력 폼 -->
        <div class="modal-body">
          <form action="login" method="post">
            <div class="mb-3">
              <label for="loginId">아이디 : </label>
              <input type="text" name="loginId" class="form-control" id="loginId" required />
              <div class="invalid-feedback">아이디를 입력해주세요.</div>
            </div>

            <div class="mb-3">
              <label for="loginPwd">비밀번호 : </label>
              <input type="password" name="loginPwd" class="form-control" id="loginPwd" required />
              <div class="invalid-feedback">비밀번호를 입력해주세요.</div>
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-success" id="LOGIN">로그인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
