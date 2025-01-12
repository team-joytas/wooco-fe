export default function Page() {
  return (
    <div className='max-w-4xl mx-auto p-[15px] bg-white'>
      <h1 className='text-[15px] font-bold mb-[20px]'>개인정보 처리방침</h1>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>제1조 (목적)</h2>
        <p className='text-[12px] leading-relaxed'>
          회사는 회원의 개인정보를 중요시하며, 이를 보호하기 위해 최선을 다하고
          있습니다. 본 방침은 회원의 개인정보가 어떤 목적으로 수집, 이용, 보관,
          파기되는지에 대해 설명합니다.
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>
          제2조 (수집하는 개인정보의 항목 및 방법)
        </h2>
        <p className='text-[12px] leading-relaxed'>
          1. 수집 항목: 이름, 아이디, 비밀번호, 장소 리뷰 작성 내역, 코스 작성
          내역, 코스 리뷰 내역, 관심 목록
          <br />
          2. 수집 방법: 회원가입 시 회원의 직접 입력 및 서비스 이용 과정에서
          자동 수집
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>
          제3조 (개인정보의 이용 목적)
        </h2>
        <p className='text-[12px] leading-relaxed'>
          회사는 수집한 개인정보를 다음 목적으로 사용합니다:
          <br />
          1. 회원 관리 및 서비스 제공
          <br />
          2. 코스 및 리뷰 관리, 알림 기능 제공
          <br />
          3. 서비스 품질 개선 및 통계 분석
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>
          제4조 (개인정보의 보관 및 파기)
        </h2>
        <p className='text-[12px] leading-relaxed'>
          1. 보관 기간: 회원 탈퇴 즉시 개인정보를 파기합니다.
          <br />
          2. 파기 방법: 전자적 파일은 복구 불가능한 방식으로 삭제하며, 종이는
          파쇄 또는 소각합니다.
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>
          제5조 (개인정보의 제3자 제공)
        </h2>
        <p className='text-[12px] leading-relaxed'>
          회사는 회원의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단,
          법령에 따라 요청받는 경우 예외로 합니다.
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>
          제6조 (개인정보 보호를 위한 안전 조치)
        </h2>
        <p className='text-[12px] leading-relaxed'>
          회사는 개인정보를 보호하기 위해 다음과 같은 조치를 취합니다:
          <br />
          1. 데이터 암호화 및 접근 통제
          <br />
          2. 주기적인 보안 점검
          <br />
          3. 개인정보 접근 권한 최소화
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>
          제7조 (회원의 권리)
        </h2>
        <p className='text-[12px] leading-relaxed'>
          1. 회원은 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다.
          <br />
          2. 회원은 개인정보 침해에 대한 문제를 회사에 신고할 수 있습니다.
        </p>
      </section>

      <section className='mb-[20px]'>
        <h2 className='text-[13px] font-semibold mb-[10px]'>제8조 (문의처)</h2>
        <p className='text-[12px] leading-relaxed'>
          개인정보와 관련된 문의는 아래로 연락해 주십시오:
          <br />
          - 이메일: support@wooco.com
          <br />- 주소: 서울특별시 노원구
        </p>
      </section>
    </div>
  )
}
