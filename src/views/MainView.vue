<script setup></script>

<template>
  <!-- 중복 아이디가 있을 때 받는 메세지 -->
  <!-- <c:if test="${not empty findPwdMsg}">
		<script>
			alert('${findPwdMsg}');
			<c:remove var="findPwdMsg" scope="session"/> // 메시지 표시 후 세션에서 삭제
		</script>
	</c:if> -->

  <!-- 로그인 관련 메세지 (성공, 실패) -->
  <!-- <c:if test="${not empty loginMsg}">
		<script>
			alert('${loginMsg}');
			<c:remove var="loginMsg" scope="session"/> // 메시지 표시 후 세션에서 삭제
		</script>
	</c:if> -->

  <!--배너 부분 시작-->
  <div>
    <div id="cards" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="5000">
          <img src="../assets/img/bg6.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="../assets/img/bg4.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="../assets/img/bg3.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- 배경 색상과 불투명도를 가진 섹션 -->
  <div class="background-color-section">
    <div class="text-center mb-5" style="margin-top: 3cm; margin-bottom: 2cm">
      <h4>
        <mark>한국의 아름다운 여행지로 떠나보세요</mark>
      </h4>
    </div>

    <!--배너 부분 끝-->
    <div class="container mt-5">
      <div class="container mt-5">
        <div class="row g-4">
          <!-- 이미지 반복 시작 -->
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg3.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>
          <!-- 이미지 9개에 대해 위의 div를 반복 -->
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>
          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>

          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>

          <div class="col-4">
            <div class="square-image">
              <img src="../assets/img/bg4.jpg" class="img-fluid" alt="Image" />
            </div>
          </div>

          <!-- 더 많은 이미지 컬럼 추가 -->
        </div>
      </div>

      <div class="text-center">
        <!-- 				<h2>뭐라도 있어야 하니까...</h2>
				<p>안녕하세요. 저는 지금 HappyDay을 듣고 있어요</p> -->
        <button class="btn btn-primary">핫플 이동하기</button>
      </div>
    </div>
  </div>

  <!-- 발바닥 시작 -->
  <!-- 발바닥 끝 -->
</template>

<style scoped>
/* 분리하면 부트스트랩 땜에 속성 안먹어서 스타일로 했어요...  */
.carousel {
  max-height: 600px; /* 원하는 캐러셀의 최대 높이 설정 */
  overflow: hidden;
}

.carousel-item img {
  width: 100%; /* 너비를 캐러셀 너비에 맞춤 */
  max-height: 600px; /* 이미지의 최대 높이를 캐러셀의 최대 높이와 동일하게 설정 */
  object-fit: cover; /* 이미지가 캐러셀 높이에 맞게 조정되도록 설정 */
}

.carousel-caption {
  position: absolute;
  top: 70%; /* 상위 컨테이너 대비 상단에서 50% 위치에 배치 */
  left: 50%; /* 상위 컨테이너 대비 왼쪽에서 50% 위치에 배치 */
  transform: translate(-50%, -50%); /* 자신의 크기를 고려하여 정확한 중앙에 배치 */
  width: 100%; /* 너비를 캐러셀 아이템의 너비와 같게 설정 */
  text-align: center; /* 텍스트를 중앙 정렬 */
}

/* 모든 웹 브라우저에서 스크롤바 숨기기 */
html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.row {
  --bs-gutter-x: 1cm; /* 가로 간격 설정 */
  --bs-gutter-y: 1cm; /* 세로 간격 설정 */
}

img.img-fluid {
  max-width: 100%;
  height: auto;
  margin-bottom: 1cm; /* 이미지 간의 거리 조정 */
}

body {
  padding: 0; /* 기존의 padding 값을 0으로 조정 */
  margin: 0; /* 모든 마진 제거 */
}

h1,
h2,
h3,
h4,
p {
  color: #333;
}

/* 이미지와 타이틀/텍스트/버튼 섹션 사이의 거리 조정 */
.text-center {
  margin-top: 2cm;
  margin-bottom: 2cm;
}

.btn-primary {
  background-color: green;
  border: none;
  padding: 10px 20px; /* 버튼의 패딩 조정 */
}

.square-image {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 가로 세로 비율 1:1 유지 */
  overflow: hidden;
}

.square-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover; /* 이미지가 컨테이너를 꽉 채우도록 */
}

.container {
  padding-right: 0;
  padding-left: 0;
}

.background-color-section {
  background-color: rgba(0, 0, 0, 0.05); /* 빨간색 배경에 불투명도 50% */
  padding: 20px; /* 콘텐츠 주위에 패딩 추가 */
  color: white; /* 텍스트 색상을 흰색으로 설정 */
}

/* 호버 속성 */
.img-fluid:hover {
  opacity: 1;
  -webkit-animation: flash 1.5s;
  animation: flash 1.5s;
}

/* 호버 속성 */
.img-fluid:hover {
  opacity: 1;
  -webkit-animation: flash 1.5s;
  animation: flash 1.5s;
}

@-webkit-keyframes flash {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

@keyframes flash {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
