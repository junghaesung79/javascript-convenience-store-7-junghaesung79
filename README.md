# javascript-convenience-store-precourse
할인 혜택, 재고 상황, 최종 결제 금액 ⇒ 결제 시스템

## 기능 목록

- [x]  입력: 상품(가격) * 수량
- [ ]  총액 / (프로모션 + 멤버십) = 최종 결제 금액
- [x]  영수증(구매 내역, 산출 금액) 출력
- [ ]  추가 구매 or 종료
- [ ]  예외 ⇒ [ERROR] 던지고 해당 지점부터 다시 입력

### 재고 관리

- [ ]  상품의 재고 수량 ⇒ 결제 가능 여부 확인
- [x]  구매 후 상품 재고 차감
- [ ]  최신 재고 상태 유지

### 프로모션 할인

- [ ]  날짜 프로모션
- [ ]  Buy N Get 1 Free: 2+1, 1+1
- [ ]  동일 상품 중복 프로모션x
  - [ ]  4개 ⇒ 2+1 차감 1개 가져옴
- [ ]  재고 내에서만 적용
  - [ ]  재고로 줄 1개가 없으면x
- [x]  프로모션 재고 우선 차감
  - [x]  프로모션 재고 부족할 경우 일반 재고 사용(프로모션x)
- [ ]  프로모션 적용 상품을 적게 가져오면 혜택 안내
  - [ ]  1+1 인데 1개만, 2+1인데 1개 또는 2개만
- [ ]  프로모션 재고 부족 일부 수량 혜택 없이 결제할 경우 정가 결제 안내

### 맴버십

- [ ]  프로모션 미적용 금액 30% 할인
- [ ]  프로모션 적용 후 남은 금액에 대해 할인 적용
- [ ]  최대 8,000 원

### 영수증 출력

- [x]  구매 내역, 할인 요약
  - [x]  구매 상품 내역: 상품명, 수량, 가격
  - [ ]  증정 상품 내역: 무료로 제공된 증정 상품 목록?
  - [ ]  **금액** 정보
    - [x]  총구매액: 상품의 총 수량, 총 금액
    - [ ]  행사 할인: 프로모션에 의해 할인된 금액
    - [ ]  멤버십할인: 멤버십에 의해 추가로 할인된 금액
    - [x]  내실 돈: 최종 결제 금액
  - [x]  영수증 요소 **보기 좋게** 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게

## 구현 중인 기능

- [ ] 장바구니 물건 구매
  - [ ] 상품 돌려놓기
  - [ ] 상품 추가
  - [ ] 증정 적용
  - [ ] 영수증 반환
