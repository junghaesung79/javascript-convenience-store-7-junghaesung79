# javascript-convenience-store-precourse
할인 혜택, 재고 상황, 최종 결제 금액 ⇒ 결제 시스템

기능 목록:

- [x]  입력: 상품(가격) * 수량
- [ ]  총액 / (프로모션 + 멤버십) = 최종 결제 금액
- [x]  영수증(구매 내역, 산출 금액) 출력
- [ ]  추가 구매 or 종료
- [ ]  예외 ⇒ [ERROR] 던지고 해당 지점부터 다시 입력

재고 관리

- [ ]  상품의 재고 수량 ⇒ 결제 가능 여부 확인
- [x]  구매 후 상품 재고 차감
- [ ]  최신 재고 상태 유지

프로모션 할인

- [ ]  날짜 프로모션
- [ ]  Buy N Get 1 Free: 2+1, 1+1
- [ ]  동일 상품 중복 프로모션x
    - [ ]  4개 ⇒ 2+1 차감 1개 가져옴
- [ ]  재고 내에서만 적용
    - [ ]  재고로 줄 1개가 없으면x
- [ ]  프로모션 재고 우선 차감
    - [ ]  프로모션 재고 부족할 경우 일반 재고 사용(프로모션x)
- [ ]  프로모션 적용 상품을 적게 가져오면 혜택 안내
    - [ ]  1+1 인데 1개만, 2+1인데 1개 또는 2개만
- [ ]  프로모션 재고 부족 일부 수량 혜택 없이 결제할 경우 정가 결제 안내

맴버십 회원은

- [ ]  프로모션 미적용 금액 30% 할인
- [ ]  프로모션 적용 후 남은 금액에 대해 할인 적용
- [ ]  최대 8,000 원

영수증 출력

- [x]  구매 내역, 할인 요약
    - [x]  구매 상품 내역: 상품명, 수량, 가격
    - [ ]  증정 상품 내역: 무료로 제공된 증정 상품 목록?
    - [ ]  **금액** 정보
        - [x]  총구매액: 상품의 총 수량, 총 금액
        - [ ]  행사 할인: 프로모션에 의해 할인된 금액
        - [ ]  멤버십할인: 멤버십에 의해 추가로 할인된 금액
        - [x]  내실 돈: 최종 결제 금액
    - [x]  영수증 요소 **보기 좋게** 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게

### 입출력 요구 사항

입력

- 구현에 필요한 상품 목록과 행사 목록을 파일 입출력함
    - 형식 유지, 값 수정
- `[콜라-10],[사이다-3]`: [상품명-가격],[],[]
- `Y or N`: 프로모션 추가 여부
- `Y or N`: 미적용 프로모션 정가 결제 여부
- `Y or N`: 멤버십 할인 적용 여부
- `Y or N`: 추가 구매 여부
    - 제고가 업데이트된 상품 목록 확인 후 추가 구매
    - 이전 상품은 결제 완료

출력

- 환영 인사, 재고안내
- 행사 상품인데 일반 재고 없으면 재고 없음

```
안녕하세요. W편의점입니다.
현재 보유하고 있는 상품입니다.

- 상품명 가격 재고,행사or재고 없음

구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
```

- 프로모션 적용 상품 안내

<aside>

현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)

</aside>

<aside>

현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)

</aside>

<aside>

멤버십 할인을 받으시겠습니까? (Y/N)

</aside>

<aside>

===========W 편의점=============
상품명\t\t수량\t금액
콜라	3	3,000
에너지바	5	10,000
===========증\t정=============
콜라	1

총구매액		8	13,000
행사할인			-1,000
멤버십할인			-3,000
내실돈			 9,000

</aside>

<aside>

감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)

</aside>

- 구매할 상품과 수량 형식이 올바르지 않은 경우: `[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`
- 존재하지 않는 상품을 입력한 경우: `[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.`
- 구매 수량이 재고 수량을 초과한 경우: `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`
- 기타 잘못된 입력의 경우: `[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.`