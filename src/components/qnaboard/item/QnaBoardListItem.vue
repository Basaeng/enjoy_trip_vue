<script setup>
defineProps({
  articles: Array
})
</script>

<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">글번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">조회수</th>
          <th scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="article in articles" :key="article.articleNo">
          <th scope="row">{{ article.articleNo }}</th>
          <td class="text-start">
            <a :href="'view/' + article.articleNo">{{ article.subject }}</a>
          </td>
          <td>{{ article.memberId }}</td>
          <td>{{ article.hit }}</td>
          <td>{{ article.registerTime }}</td>
        </tr>
        <!-- <c:forEach var="article" items="${articles}">
                <tr class="text-center">
                  <th scope="row">${article.articleNo}</th>
                  <td class="text-start">
                    <a
                      href="view?&articleNo=${article.articleNo}"
                      class="article-title link-dark"
                      style="text-decoration: none"
                      >${article.subject}</a
                    >
                  </td>
                  <td>${article.memberId}</td>
                  <td>${article.hit}</td>
                  <td>${article.registerTime}</td>
                </tr>
              </c:forEach> -->
      </tbody>
    </table>
  </div>
</template>

<style scoped>
a{
  color: black;
  text-decoration: none
}
</style>
