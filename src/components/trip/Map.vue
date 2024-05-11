<script>
import { ref, onUnmounted } from 'vue';

export function useKakaoMap(mapContainer) {
  const map = ref(null);
  const markers = ref([]);
  const overlays = ref([]);

  // 지도 초기화 함수
  function initializeMap() {
    kakao.maps.load(() => {
      map.value = new kakao.maps.Map(mapContainer.value, {
        center: new kakao.maps.LatLng(37.566535, 126.9779692), // 서울 시청을 중심으로
        level: 9
      });

      // 지도 컨트롤 추가
      const mapTypeControl = new kakao.maps.MapTypeControl();
      map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new kakao.maps.ZoomControl();
      map.value.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    });
  }

  // 마커 추가 함수
  function addMarker(latitude, longitude) {
    const imageSrc = "./assets/img/animal/marker7.png",
          imageSize = new kakao.maps.Size(80, 80),
          imgOptions = {
            spriteSize: new kakao.maps.Size(45, 45),
            spriteOrigin: new kakao.maps.Point(0, 0),
            offset: new kakao.maps.Point(12, 60)
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude),
            image: markerImage
          });

    marker.setMap(map.value);
    markers.value.push(marker);
    return marker;
  }

  // 마커 제거 함수
  function removeMarker() {
    markers.value.forEach(marker => marker.setMap(null));
    markers.value = [];
  }

  // 오버레이 추가 함수
  function displayMarker(options) {
    const marker = addMarker(options.latitude, options.longitude);

    const overlay = new kakao.maps.CustomOverlay({
      content: createOverlayContent(options.title, options.addr1),
      position: marker.getPosition(),
      xAnchor: 0.3,
      yAnchor: 0.91
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      removeOverlay();
      overlay.setMap(map.value);
    });

    overlays.value.push(overlay);
  }

  // 오버레이 제거 함수
  function removeOverlay() {
    overlays.value.forEach(overlay => overlay.setMap(null));
    overlays.value = [];
  }

  // 오버레이 콘텐츠 생성 함수
  function createOverlayContent(title, addr1) {
    const content = document.createElement('div');
    content.className = 'custom-overlay';
    content.innerHTML = `<strong>${title}</strong><p>${addr1}</p>`;
    return content;
  }

  // 컴포넌트가 언마운트 될 때 모든 오버레이와 마커 제거
  onUnmounted(() => {
    removeMarker();
    removeOverlay();
  });

  return { map, addMarker, removeMarker, displayMarker, removeOverlay, initializeMap };
}

</script>

<template>
    <div>
        
    </div>
</template>

<style scoped>

</style>