<script setup>
import { onMounted, onUpdated, ref } from "vue";
import {Axios} from '@/util/http-common.js';

const http = Axios();

const props = defineProps({ keyword: String });
const appKey = import.meta.env.VITE_KAKAO_APPKEY;
const sidoList = ref([]); // 지역 목록을 저장할 반응적 데이터

const markers = ref([]);
const overlays = ref([]);
const positions = ref([]);

const map = ref(null);

const apiUrl = import.meta.env.VITE_API_URL
console.log(props.keyword);
const loadScript = () => {
  const script = document.createElement("script");
  /* global kakao */
  script.onload = () => kakao.maps.load(initMap);
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,clusterer,drawing`;
  document.head.appendChild(script);
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
	center: new kakao.maps.LatLng(37.566535, 126.9779692),
    level: 9,
  };
  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map.value = new kakao.maps.Map(container, options);
  //map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
  //map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP); 
  // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();
map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
};

const params = ref({
	areaCode : "",
	contentTypeId : "",
	keyword : "",
});

function search(){
	var url = apiUrl + 'api/tripSearch?'
	if (!params.value.keyword) {
		if (parseInt(params.value.contentTypeId)) url += `&contenttypeid=${params.value.contentTypeId}`;
		if (parseInt(params.value.contentTypeId)) url += `&sidoCode=${params.value.areaCode}`;
	} else {
		url += `&keyword=${params.value.keyword}`;

		if (parseInt(params.value.areaCode)) {
			url += `&sido=${params.value.areaCode}`;
		}

		if (parseInt(params.value.contentTypeId)) {
			url += `&contenttypeid=${params.value.contentTypeId}`;
		}
  }

  	// console.log(url);
	// fetch(url)
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		if (data.length === 0) {
	// 			alert("검색결과가 없습니다.");
	// 		} else {
	// 			displayPlaces(data);
	// 		}
	// 	})

	http.get(url)
	.then((response) => {
		if(response.data.length === 0){
			alert("검색결과가 없습니다.");
		}else{
			displayPlaces(response.data);
		}
	})
}

function displayPlaces(places) {
	const bounds = new kakao.maps.LatLngBounds();
	removeMarker();

	positions.value = [];

	places.forEach(place => {
		const position = new kakao.maps.LatLng(place.latitude, place.longitude);
		positions.value.push({
		title: place.addr1,
		latlng: position
		});

  });

  // 코드 수정
  for (var i = 0; i < positions.value.length; i++) {
	const placePosition = new kakao.maps.LatLng(places[i].latitude, places[i].longitude);

	displayMarker(places, i);
	bounds.extend(placePosition);
	}
 

  map.value.setBounds(bounds);
}

function displayMarker(places, i){
	const marker = addMarker(places[i].latitude, places[i].longitude);
	const overlay = new kakao.maps.CustomOverlay({
		position: marker.getPosition(),
	});

	const content = document.createElement('div');
	content.className = 'wrap';

	// info div 생성
	const infoDiv = document.createElement('div');
	infoDiv.className = 'info';
	content.appendChild(infoDiv);

	// title div 생성
	const titleDiv = document.createElement('div');
	titleDiv.className = 'title';
	titleDiv.textContent = places[i].title;
	infoDiv.appendChild(titleDiv);

	// body div 생성
	const bodyDiv = document.createElement('div');
	bodyDiv.className = 'body';
	infoDiv.appendChild(bodyDiv);

	// img div 생성
	const imgDiv = document.createElement('div');
	imgDiv.className = 'img';
	bodyDiv.appendChild(imgDiv);

	// 이미지 요소 생성
	const img = document.createElement('img');
	img.src = places[i].firstImage || './assets/img/preparingimg.jpg';
	img.width = 73;
	img.height = 70;
	imgDiv.appendChild(img);

	// desc div 생성
	const descDiv = document.createElement('div');
	descDiv.className = 'desc';
	infoDiv.appendChild(descDiv);

	// ellipsis div 생성 (주소)
	const ellipsisDiv = document.createElement('div');
	ellipsisDiv.className = 'ellipsis';
	ellipsisDiv.textContent = places[i].addr1;
	descDiv.appendChild(ellipsisDiv);

	// jibun div 생성 (추가 주소)
	const jibunDiv = document.createElement('div');
	jibunDiv.className = 'jibun ellipsis';
	jibunDiv.textContent = places[i].addr2 || '';
	descDiv.appendChild(jibunDiv);

  
// 닫기 버튼 생성 및 이벤트 처리
const closeBtn = document.createElement("button");
  closeBtn.className = "btn btn-primary btn-sm";
  closeBtn.style.cssText = "float: right;"; // 위치 조정
  closeBtn.textContent = "닫기";

  closeBtn.onclick = function() {
    overlay.setMap(null);
  };

  content.appendChild(closeBtn);

  
	// 마커 클릭 이벤트 설정
	overlay.setContent(content);

	kakao.maps.event.addListener(marker, "click", function() {
		removeOverlay();
		overlay.setMap(map.value);
	});

	overlays.value.push(overlay);
	return overlay;

}

function addMarker(latitude, longitude) {
  const markerImage = new kakao.maps.MarkerImage(
    "src/assets/img/animal/marker7.png", 
    new kakao.maps.Size(80, 80),
    {
      spriteSize: new kakao.maps.Size(45, 45),
      spriteOrigin: new kakao.maps.Point(0, 0),
      offset: new kakao.maps.Point(12, 60)
    }
  );
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(latitude, longitude),
    image: markerImage
  });

  marker.setMap(map.value);
  markers.value.push(marker);
  return marker;
}


function removeMarker() {
	console.log(123);
	for (var i = 0; i < markers.value.length; i++) {
		markers.value[i].setMap(null);
	}

	for (var j = 0; j < overlays.value.length; j++) {
		overlays.value[j].setMap(null);
	}

    markers.value = [];
    positions.value = [];
    overlays.value = [];
}

function removeOverlay() {
  for (var i = 0; i < overlays.value.length; i++) {
    overlays.value[i].setMap(null);
  }
}




onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
    
  } else {
    loadScript();
  }
});

onUpdated(() => {

});

console.log("kakaoMap.js loaded");

  // 지역 목록을 가져오는 함수
  async function getSido() {
	const url = apiUrl + "api/sidolist";
	try {
	  const response = await fetch(url);
	  const data = await response.json();
	  sidoList.value = data; // 응답 데이터를 sidoList에 할당
	} catch (error) {
	  console.error("Failed to fetch Sido list:", error);
	}
  }
  

  
  onMounted(getSido); // 컴포넌트 마운트 시 getSido 함수 실행
</script>

<template>
<div class="container" style="margin-top: 10%;">
		<input id="memberId" value="" type="hidden" />

		<div class="col">
			<form role="" action="" >
				<div class="row justify-content-center">
					<div class="col-md-3 text-center">
						<select v-model="params.areaCode" class="form-select mb-3">
							<option v-for="sido in sidoList" :key="sido.sidoCode" :value="sido.sidoCode">
								{{ sido.sidoName }}
							</option>
						</select>
					</div>
					<div class="col-md-3 text-center">
						<select id="search-content-id" class="form-select mb-3"
							aria-label="Default select example" v-model="params.contentTypeId">
							<option value="0" selected>관광지 유형</option>
							<option value="12">관광지</option>
							<option value="14">문화시설</option>
							<option value="15">축제공연행사</option>
							<option value="25">여행코스</option>
							<option value="28">레포츠</option>
							<option value="32">숙박</option>
							<option value="38">쇼핑</option>
							<option value="39">음식점</option>
						</select>
					</div>
					<div class="col-md-3 mb-3 text-center d-flex col">
						<input id="search-keyword" class="form-control mr-2" type="search"
							name="search-keyword" placeholder="검색어" aria-label="검색어" v-model="params.keyword" />
							<button class="btn btn-primary btn-sm" name="name1" type="button" @click="search" style="white-space: nowrap; margin-left: 5%">
							검색
							</button>
					</div>
				</div>
			</form>
			<div class="col" id="map" style="height: 600px"></div>

		</div>
	</div>
</template>

<style>
.wrap {
	position: absolute;
	left: 0;
	bottom: 30px;
	width: 288px;
	height: 140px;
	margin-left: -140px;
	text-align: left;
	overflow: hidden;
	font-size: 12px;
	font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
	line-height: 1.5;
}

.wrap * {
	padding: 0;
	margin: 0;
}

.wrap .info {
	width: 286px;
	height: 120px;
	border-radius: 5px;
	border-bottom: 2px solid #ccc;
	border-right: 1px solid #ccc;
	overflow: hidden;
	background: #fff;
}

.wrap .info:nth-child(1) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}

.info .title {
	padding: 5px 0 0 10px;
	height: 30px;
	background: #eee;
	border-bottom: 1px solid #ddd;
	font-size: 18px;
	font-weight: bold;
}

.info .close {
	position: absolute;
	top: 10px;
	right: 10px;
	color: #888;
	width: 17px;
	height: 17px;
	background:
		url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}

.info .close:hover {
	cursor: pointer;
}

.info .body {
	display: inline;
	position: relative;
	overflow: hidden;
}

.info .desc {
	position: relative;
	margin: 13px 0 0 90px;
	height: 75px;
}

.desc .ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.desc .jibun {
	font-size: 11px;
	color: #888;
	margin-top: -2px;
}

.info .img {
	position: absolute;
	top: 6px;
	left: 5px;
	width: 73px;
	height: 71px;
	border: 1px solid #ddd;
	color: #888;
	overflow: hidden;
}

.info:after {
	content: "";
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: 0;
	width: 22px;
	height: 12px;
	background:
		url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.info .link {
	color: #5085bb;
}
</style>