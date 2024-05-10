<script setup>
import { Axios } from '@/util/http-common'
import { onMounted, ref } from 'vue'
import BoardListItem from '@/components/board/item/BoardListItem.vue'

onMounted(() => {
  getBoardList()
})

const http = Axios()

const articles = ref()

const getBoardList = () => {
  http.get('/api/list').then(({ data }) => {
    console.log(data)
    articles.value = data.articles
  })
}

//  <>
// 	const searchKey = "${param.key}"; // 현재 요청에서 'key' 파라미터 값
//     const searchWord = "${param.word}"; // 현재 요청에서 'word' 파라미터 값

// document.addEventListener('DOMContentLoaded', function() {
//     // 페이지 네비게이션 버튼에 대한 클릭 이벤트 리스너 설정
//     document.querySelectorAll('.page-item[data-pg]').forEach(function(item) {
//         item.addEventListener('click', function(e) {
//             e.preventDefault(); // 기본 동작 방지

//             // 페이지 번호를 data-pg 속성에서 가져옴
//             const pageNum = this.getAttribute('data-pg');

//             // 숨겨진 폼에 값 설정
//             document.getElementById('p-action').value = 'list'; // 동작 지정, 필요에 따라 변경 가능
//             document.getElementById('p-pgno').value = pageNum; // 페이지 번호 설정
//             document.getElementById('p-key').value = searchKey;
//             document.getElementById('p-word').value = searchWord;

//             // 폼 액션 설정 및 제출
//             document.getElementById('form-param').action = rootPath + '/board.do';
//             document.getElementById('form-param').submit();
//         });
//     });
// });

// document.addEventListener("DOMContentLoaded", function() {
// 	// 글목록 이동
// 	const btnList = document.querySelector("#btn-list");
// 	if (btnList) {
// 		btnList.addEventListener("click", function() {
// 			location.href = rootPath + "/list";
// 		});
// 	}

// 	// 전체 조회(list) -> 글쓰기 페이지 이동
// 	const btnMvRegister = document.querySelector("#btn-mv-register");
// 	if (btnMvRegister) {
// 		btnMvRegister.addEventListener("click", function() {
// 			location.href = rootPath + "/mvwrite";
// 		});
// 	}

// 	// 글수정 페이지(modify) -> 실제 수정
// 	const btnModify = document.querySelector("#btn-modify");
// 	if (btnModify) {
// 		btnModify.addEventListener("click", function() {
// 			if (!document.querySelector("#subject").value) {
// 				alert("제목 입력!!");
// 				return;
// 			} else if (!document.querySelector("#content").value) {
// 				alert("내용 입력!!");
// 				return;
// 			} else {
// 				let form = document.querySelector("#form-modify");
// 				form.submit();
// 			}
// 		});
// 	}

// 	// 전체 조회(list) ->글작성 버튼 클릭 이벤트
// 	const btnRegister = document.querySelector("#btn-register");
// 	if (btnRegister) {
// 		btnRegister.addEventListener("click", function() {
// 			if (!document.querySelector("#subject").value) {
// 				alert("제목 입력!!");
// 				return;
// 			} else if (!document.querySelector("#content").value) {
// 				alert("내용 입력!!");
// 				return;
// 			} else {
// 				let form = document.querySelector("#form-register");
// 				form.submit();
// 			}
// 		});
// 	}

// 	// 상세 조회(view) -> 글수정 페이지 이동
// 	const btnMvModify = document.querySelector("#btn-mv-modify");
// 	if (btnMvModify) {
// 		btnMvModify.addEventListener("click", function() {
// 			alert(rootPath + "/mvmodify?&articleNo=" + articleNumber);
// 			location.href = rootPath + "/mvmodify?&articleNo=" + articleNumber;
// 		});
// 	}

// 	// 상세 조회(view) ->글삭제 이벤트
// 	const btnDelete = document.querySelector("#btn-delete");
// 	if (btnDelete) {
// 		btnDelete.addEventListener("click", function() {
// 			if (confirm("글을 삭제하시겠습니까?")) {
// 				location.href = rootPath + "/delete?&articleNo=" + articleNumber;
// 			}
// 		});
// 	}

// 	/*그냥 댓글*/
// 	var commentForm = document.getElementById('comment-form');

// 	commentForm.addEventListener('submit', function(event) {
// 		event.preventDefault(); // 폼의 기본 제출 동작을 방지

// 		var comment = document.getElementById('comment').value;
// 		var articleNo = document.getElementById('articleNo').value; // 게시글 번호 가져오기
// 		var data = 'comment=' + encodeURIComponent(comment) + '&articleNo=' + encodeURIComponent(articleNo);

// 		var xhr = new XMLHttpRequest();
// 		xhr.open('POST', rootPath + '/registCmt', true);
// 		//인코딩해서 서버에 전하기
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 		xhr.onload = function() {
// 			if (xhr.status === 200) {
// 				// 요청이 성공적으로 완료되었을 때의 처리
// 				alert('댓글이 등록되었습니다.');
// 				console.log(xhr.responseText);
// 				const newComment = JSON.parse(xhr.responseText); // 응답으로 받은 JSON 데이터를 객체로 변환
// 				addCommentToPage(newComment); // 새 댓글을 페이지에 추가하는 함수
// 				document.getElementById('comment').value = ''; // 댓글 입력란 비우기
// 				// 추가적인 성공 처리 로직
// 			} else {
// 				// 서버 에러 처리
// 				alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
// 			}
// 		};
// 		xhr.onerror = function() {
// 			// 네트워크 레벨에서의 오류 처리
// 			alert('네트워크 오류가 발생했습니다.');
// 		};
// 		xhr.send(data);
// 	});

// 	/*대댓글*/
// 	var replyForm = document.getElementById('reply-form');
// 	replyForm.addEventListener('submit', function(event) {
// 		event.preventDefault();

// 		var articleNo = document.getElementById('reply-article-no').value;
// 		var parentId = document.getElementById('reply-parent-id').value;
// 		var comment = document.getElementById('reply-comment').value; // 댓글 내용 가져오기
// 		var data = 'comment=' + encodeURIComponent(comment) + '&articleNo=' + encodeURIComponent(articleNo) + '&parentId=' + encodeURIComponent(parentId);

// 		console.log(articleNo, parentId, comment);

// 		var xhr = new XMLHttpRequest();
// 		xhr.open('POST', rootPath + '/registCmt', true);
// 		//인코딩해서 서버에 전하기
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 		xhr.onload = function() {
// 			if (xhr.status === 200) {
// 				// 요청이 성공적으로 완료되었을 때의 처리
// 				alert('댓글이 등록되었습니다.');
// 				console.log(xhr.responseText);
// 				const newComment = JSON.parse(xhr.responseText); // 응답으로 받은 JSON 데이터를 객체로 변환
// 				addCommentToPage(newComment); // 새 댓글을 페이지에 추가하는 함수
// 				document.getElementById('reply-comment').value = ''; // 댓글 입력란 비우기
// 			} else {
// 				// 서버 에러 처리
// 				alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
// 			}
// 		};
// 		xhr.onerror = function() {
// 			// 네트워크 레벨에서의 오류 처리
// 			alert('네트워크 오류가 발생했습니다.');
// 		};
// 		xhr.send(data);
// 	});

// });

// /* 댓글을 추가했을 때 해당 페이지에서 inner HTML로 삽입한다 */
// function addCommentToPage(comment) {
// 	const commentList = document.getElementById('comment-list');
// 	const commentElement = document.createElement('div');
// 	commentElement.classList.add('comment-item');

// 	//새로 작성하는 댓글
// 	commentElement.innerHTML = `
// 		<hr>
//         <div class="comment" style="margin-left: ${comment.depth * 20}px;">

//             <div class="d-flex justify-content-between">
// 								<div class="comment-body">
// 									<div class="comment-author">${comment.memberId}</div>
// 									<div class="comment-text">${comment.comment}</div>
// 									<div class="comment-date">${comment.registTime}</div>
// 								</div>
// 									<div class="dropdown btn-group dropstart">
// 										<button class="btn dropdown-toggle" type="button"
// 											id="dropdownMenuButton${comment.commentId}"
// 											data-bs-toggle="dropdown" aria-expanded="false"
// 											style="border: none;"></button>
// 										<ul class="dropdown-menu" style="border: none;"
// 											aria-labelledby="dropdownMenuButton${comment.commentId} ">
// 											<li><a class="dropdown-item" href="#"
// 												onclick="editComment(${comment.commentId}); return false;">수정</a></li>
// 											<li><a class="dropdown-item" href="#"
// 												onclick="deleteComment(${comment.commentId}); return false;">삭제</a></li>
// 										</ul>
// 									</div>
// 							</div>

//             <button type="button" class="btn-reply btn mini yellow mb-3 ms-1"
//                 onclick="showReplyForm(${comment.commentId}, this)"
//                 data-article-no="${comment.articleNo}"
//                 data-parent-id="${comment.commentId}">답글</button>
//         </div>
//         `;

// 	// 대댓글이라면 부모 댓글을 아래 삽입
// 	if (comment.parentId) {
// 		const parentCommentElement = commentList.querySelector(`.comment[data-comment-id="${comment.parentId}"]`);
// 		if (parentCommentElement) {
// 			parentCommentElement.insertAdjacentElement('afterend', commentElement);
// 		} else {
// 			// 부모 댓글 x -> 댓글 목록 끝에 추가
// 			commentList.appendChild(commentElement);
// 		}
// 	} else {
// 		// 최상위 댓글 -> 댓글 목록 끝에 추가
// 		commentList.appendChild(commentElement);
// 	}
// }

// function showReplyForm(commentId, buttonElement) { ////답글 버튼의 DOM 참조
// 	// 답글 폼의 위치를 결정하고 표시하기
// 	var commentElement = buttonElement.closest('.comment');  //가까운 부모 .comment로 찾아서 다음에 폼 표시
// 	var replyFormContainer = document.getElementById('reply-form-container');
// 	commentElement.after(replyFormContainer); //commentElement 뒤에 replyFormContainer를 삽입한다.

// 	// 답글 폼에 필요한 데이터 설정하기
// 	document.getElementById('reply-article-no').value = buttonElement.dataset.articleNo;
// 	document.getElementById('reply-parent-id').value = buttonElement.dataset.parentId;
// 	document.getElementById('reply-comment').value = ''; // 댓글 입력란 비우기

// 	// 답글 폼 표시
// 	replyFormContainer.style.display = 'block';
// }

// /*댓글 수정 함수*/
// function editComment(commentId) {
// 	console.log('Editing comment:', commentId);
// }

// /*댓글 삭제 함수*/
// function deleteComment(commentId) {
// 	if (confirm('하위 댓글이 전부 삭제됩니다.')) {
// 		console.log('Deleting comment:', commentId);
// 		console.log(rootPath + "/deleteCmt?&commentId=" + commentId);
// 		$.ajax({
// 			url: rootPath + "/deleteCmt", // 실제 댓글을 처리하는 서버의 URL
// 			type: 'POST',
// 			data: { commentId: commentId },
// 			success: function(response) {
// 				alert('댓글 삭제에 성공했습니다.');
// 				$('[data-comment-id="' + commentId + '"]').remove();
// 			},
// 			error: function() {
// 				alert('댓글 삭제 중 오류가 발생했습니다.');
// 			}
// 		});
// 	}
// }
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
              <button type="button" id="btn-mv-register" class="btn btn-outline-primary btn-sm">
                글쓰기
              </button>
            </div>
            <div class="col-md-7 offset-3">
              <form id="form-search" class="d-flex" method="GET" action="list">
                <input type="hidden" name="pgno" value="1" />
                <select
                  id="key"
                  name="key"
                  class="form-select form-select-sm ms-5 me-1 w-50"
                  aria-label="검색조건"
                >
                  <option value="" selected>검색조건</option>
                  <option value="article_no">글번호</option>
                  <option value="subject">제목</option>
                  <option value="member_id">작성자</option>
                </select>
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" name="word" placeholder="검색어..." />
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
