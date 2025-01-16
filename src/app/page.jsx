"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle }) => (
  <div className="relative mb-8 md:mb-12 px-4">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
      <span className="relative inline-block pb-4">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]"></span>
      </span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// もしくは別のデザインバージョン
const SectionHeader2 = ({ title, subtitle }) => (
  <div className="relative mb-12 md:mb-16 px-4">
    <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-bold text-center w-full">
      <span className="relative z-10">{title}</span>
      <span className="absolute left-0 bottom-1 w-full h-3 bg-rose-200/30 -rotate-1 z-0"></span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// カラーパレットの定義
const colors = {
  primary: {
    bg: 'bg-[#f8f6f4]',      // ベースの明るいベージュ
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#d4c3b7]',  // ライトブラウン
  },
  secondary: {
    light: 'bg-[#fdfbf9]',   // オフホワイト
    border: 'border-[#e8e2dc]', // ライトベージュ
    hover: 'hover:bg-[#f3efe9]', // ホバー時のベージュ
  }
};

function MainComponent() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 各セクションのIntersectionObserverを設定
  const [conceptRef, conceptInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [staffRef, staffInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [requirementsRef, requirementsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [qaRef, qaInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [ownerRef, ownerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });

  // スクロール位置を監視して、ボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたらボタンを表示
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 悩みセクションの各項目用のIntersectionObserver
  const concerns = [
    "産後、低単価サロンなら簡単だと思い入社",
    "教育時間は営業時間外で疲弊💦即戦力として求められる💦",
    "自信がないまま、1人で5〜7名をこなさなければならず疲弊💦\n子どもが発熱、予約を代わってもらえず無理やり保育園へ入れる毎日💦",
    "仕事をこなすことに精一杯で駒のように感じる💦",
  ];

  const concernRefs = concerns.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  }));

  // アニメーション用のIntersectionObserver設定を確認
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // より早くトリガーされるように閾値を下げる
    rootMargin: '-50px'
  });

  // アニメーションクラスの定義を確認
  const fadeInUpClass = 'transition-all duration-1000 ease-out';
  const fadeInUpAnimation = (inView) => 
    `${fadeInUpClass} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;

  const RequirementSection = () => {
    const requirements = [
      {
        main: "仕事と家庭を両立したい方",
        sub: "家庭が一番なので、仕事よりも家族を優先したい方"
      },
      {
        main: "無理なく生涯現役で美容師を続けたい方",
        sub: "1日3名までの丁寧な施術で、疲弊することなく働きたい方"
      },
      {
        main: "現場以外のキャリアも積んでいきたい方",
        sub: "商品開発や企画広報などに挑戦したい方"
      },
      {
        main: "残業ゼロ・ゆとりある予約・数字を追わない仕事をしていきたい方",
        sub: "心に余裕を持って働きたい方"
      },
      {
        main: "社会貢献や地域のイベントなどを、楽しんでやってみたい方",
        sub: "美容師以外のことにもやりがりを持っていきたい方"
      }
    ];

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
      rootMargin: '-50px'
    });

    return (
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="求める人材"
          subtitle="私たちと一緒に働きませんか？"
        />
        
        <div className="max-w-4xl mx-auto px-4">
          <div 
            ref={ref}
            className={`space-y-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {requirements.map((req, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-[#D3B58D]/20 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base md:text-lg font-bold text-black">
                      {req.main}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {req.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <button className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
              応募する
            </button>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
            最近入社　なつみさんからのメッセージを見る
            </button>
          </div>
        </div>
      </section>
    );
  };

  // 悩みセクション用のIntersectionObserver設定を調整
  const { ref: concernsRef, inView: concernsInView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // より早くトリガーされるように閾値を下げる
    rootMargin: '-10px' // マージンを小さくしてより早くトリガー
  });

  return (
    <div className="font-noto-sans relative">
      <header className="bg-[#fafafa] py-8 md:py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          
          
          <div className="relative">
            <Image
              src="/image/michill.jpg"
              alt="明るく清潔感のあるサロン内装"
              width={1200}
              height={600}
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-white px-4 md:px-8 text-center space-y-8">
                <p className="text-lg md:text-2xl font-medium mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                  1年後、お客様から必要とされ<br />
                  5年後、地域から必要とされ<br />
                  10年後は未来から必要とされる美容師へ。
                </p>
                
                <p className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
                  月が満ち、地域が満ち、女性が満ちる、<br />
                  そんな世界観を共に創っていただけませんか
                </p>
                
                <div className="relative">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-0 blur-sm" id="blurText">
                    女性専用サロン <span className="inline-block">michill（ミチル）</span>
                  </p>
                  <style jsx>{`
                    #blurText {
                      animation: blurReveal 2s ease-out 2s forwards;
                    }
                    
                    @keyframes blurReveal {
                      0% {
                        opacity: 0;
                        filter: blur(10px);
                      }
                      100% {
                        opacity: 1;
                        filter: blur(0);
                      }
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </header>

      

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <button className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
              応募する
            </button>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
              ロニー代表からのメッセージを見る
            </button>
          </div>

      

      <section className="py-16 md:py-24 mt-16 md:mt-24">
        <SectionHeader 
          title="世の中の女性美容師さんが抱える悩み事、当サロンでは一切致しません"
          subtitle="現場で女性美容師さんを困らせること"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-8">
            {/* 左側: 一般的な美容室の悩み */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-red-600">＜他店＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {concerns.map((concern, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-red-200 rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed whitespace-pre-line`}
                    >
                      {concern}
                    </div>
                    
                    {index < concerns.length - 1 && (
                      <div className="text-red-400 text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 右側: michillでの解決策 */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-[#D3B58D]">＜michillの場合＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "平均18,000円以上の高単価サロンでゆとりある予約状況✨",
                  "教育終了後に3名程度でゆったり接客✨",
                  "ママ美容師の先輩がいますので、みんなで予約をすぐに調整✨",
                  "外部相談役も。心理的安全性を保ちながら地域に必要とされる存在へ共に✨"
                ].map((solution, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-[#D3B58D] rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed`}
                    >
                      {solution}
                    </div>
                    
                    {index < 3 && (
                      <div className="text-[#D3B58D] text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl font-bold text-center mb-6">
            <span className="text-[#D3B58D]">michill（ミチル）の特徴</span>
            <br className="md:hidden" />
          </h3>

          <div className="text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto space-y-6">
            

            <div className="bg-white/60 rounded-lg p-4 shadow-sm">
              ①平均18,000円の高単価サロンで
              <br className="sm:hidden" />
              年齢を重ねた接客がむしろ強みに
              <br className="sm:hidden" />
              
              <br className="sm:hidden" />
              お客様の年齢層も40代以降の方が多いため
              <br className="sm:hidden" />
              担当する美容師も40代以降ですと安心感を持たれます

            </div>

            <div className="bg-white/60 rounded-lg p-4 shadow-sm">
              ②ゆとりある働き方
              <br className="sm:hidden" />
              <br className="sm:hidden" />
              1日に何名もこなさずに済み
              <br className="sm:hidden" />
              いつまでも現役美容師として美しく働ける
            </div>

            <div className="bg-white/60 rounded-lg p-4 shadow-sm">
              ③現場仕事だけでない「複数キャリア」の推進
              <br className="sm:hidden" />
              <br className="sm:hidden" />
              美容業界では珍しい
              <br className="sm:hidden" />
             　メーカー・商品開発・企画広報部、在宅仕事など
             <br className="sm:hidden" />
            急な家族トラブルや体調の揺らぎにも
            <br className="sm:hidden" />
              対応できるよう活躍の場を用意しています
            </div>

            
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="michillで働くことで得られること"
          subtitle="あなたらしい働き方"
        />
        <div className="max-w-4xl mx-auto px-4">
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                新しい技術・スキルを営業内に学ぶことができます
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/zikannai.JPG"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、体と心に負担がかからず、家庭とお仕事の両立ができます。
                  女性にゆとりができると家族の雰囲気もガラッと変わりますね。
                  10年後、お子さまやパートナーからもリスペクトされる働き方を作りましょう。
          
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                現場以外のキャリアを叶えることができます
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/miga.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、急な体調のゆらぎが起こった場合はしばらくは在宅に切り替えたり、
                  現場以外のメーカー部や企画広報部としてのお仕事で地域貢献もできます、
                  弊社ではコンセプトの異なる4サロンを展開しているため、
                  年齢や希望に沿った働き方を一緒に作っていきましょう。

                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                特化メニューの提供
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/sezyutu.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  「白髪老化ケア」という頭皮や髪を錆びさせずに、
                  守り続ける施術を自社開発しました。
                  これにより、お客様が失客せず、末永く施術することが可能になりました。
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <button className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
              応募する
            </button>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
              みんなの女将　千穂子からのメッセージを見る
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <SectionHeader 
          title="スタッフ紹介"
          subtitle="働く仲間"
        />
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-8">
            <div className="bg-[#f5f5f5] p-4 md:p-8 rounded-xl shadow-sm">
              <div className="bg-white/80 p-6 rounded-xl shadow-sm h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-quote-left text-[#D3B58D] text-xl"></i>
                  <span className="text-[#D3B58D] font-medium">スタッフの声</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 border-white shadow-md mr-4 flex-shrink-0">
                    <Image
                      src="/image/aoi.jpg"
                      alt="スタッフ1"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">あおい</p>
                    <p className="text-sm text-gray-600">入社4年目 / スタイリスト</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700">
                    4歳の子供がいるため、急な休みを取ることも。
                  </p>
                  
                  <p className="text-gray-700">
                    でも<span className="font-bold text-[#D3B58D]">michillでは</span>、
                    <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
                      スタッフが快く対応してくれ、お客様への連絡も代わりにしてくれます。
                    </span>
                  </p>
                  
                  <p className="text-gray-700">
                    お客様も子育て経験者が多く理解があるので、
                    <span className="border-b-2 border-[#D3B58D]">
                      ママでも安心して美容師を続けられています！
                    </span>
                  </p>
                </div>
                
                <div className="mt-auto">
                  <iframe 
                    src="https://www.instagram.com/reel/C_7jiphvJ4I/embed" 
                    className="w-full aspect-[9/16] max-w-[280px] mx-auto"
                    frameBorder="0" 
                    scrolling="no" 
                    allowtransparency="true"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* 追加のスタッフカードをここに配置 */}
          </div>
        </div>
      </section>

      <RequirementSection />

      <section className="py-16 md:py-24" id="qa" ref={qaRef}>
        <SectionHeader 
          title="よくあるご質問"
          subtitle="Q&A"
        />
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {[
              {
                question: "技術に不安があっても大丈夫ですか？",
                answer: "研修期間中は、営業時間内の６割がトレーニングです。オリジナルのアプリがありますのでそれを見てご自身の空いている時間に勉強ができます。"
              },
              {
                question: "お客様の年齢層は？",
                answer: "30〜60代の女性のみです。白髪染めやヘアケアに関心の高いお客様が中心です。"
              },
              {
                question: "採用までの流れはどんな感じですか？",
                answer: "まずzoomでオンライン面談をします。その後、サロン見学＆メニューの体験をしてご希望があれば面接をします。"
              },
              
            ].map((qa, index) => (
              <details 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-sm group transition-all duration-500 ease-out hover:shadow-md ${
                  qaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <summary className="text-lg md:text-xl font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
                  <span className="flex items-center gap-3">
                    <span className="text-[#D3B58D]">Q.</span>
                    {qa.question}
                  </span>
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#D3B58D]">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pl-6 text-gray-600 leading-relaxed">
                  <span className="text-[#D3B58D] font-medium">A.</span>
                  <span className="ml-2">{qa.answer}</span>
                </div>
              </details>
            ))}
          </div>
          
          
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="オーナー挨拶"
          subtitle="Message from Owner"
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 flex flex-col items-center text-center">
                <div className="w-40 h-40 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white shadow-md mb-4">
                  <Image
                    src="/image/roni.jpg"
                    alt="オーナーの写真"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">オーナー</h3>
                <p className="text-gray-600 mb-6 md:mb-0">RONI</p>
              </div>
              
              <div className="md:w-2/3">
                <div className="prose prose-sm md:prose-lg max-w-none">
                  <p className="space-y-4 md:space-y-6">
                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      私たちは、ママ美容師、休眠、復帰美容師、40歳以降の美容師さんの未来が見通せず疲弊してしまう環境を、無理なく未来が見通せる環境を作ることを目指しています。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      そのために一社のミチルという女性専用サロンをオープンしました。そこで高価値を作る為に子会社の商材メーカーを立ち上げ、自社オリジナルの白髪老化ケアメニューを作りました。それを強みに短い時間でも収入とサロンにいる時の時間がキャリアを重ねていける環境を作ることに成功しました。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      私たちはこういった取り組みの他に、地域の支援や環境に対する事業活動も社員の人間力の育成の一環として大切にしております。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      まだ今も業界は売上こそ価値であるという美容室が多いです。私たちは数字を追わずに人を追い、スタッフ一人一人の可能性を信じて組織を作っております。
                    </span>

                    <span className="block text-gray-800 text-base md:text-lg leading-relaxed">
                      私たちは発展途上です。まだまだ一緒に手伝ってくれる仲間を募集しております。是非、相談だけでもいいので気軽に連絡をくださいね。
                    </span>
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4">SNS</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/michill_hair/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">サロン公式</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/rony_19795/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">オーナー</span>
                  </a>
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/image/dansu.png"
                    alt="スタッフ全員でギリギリダンス"
                    width={800}
                    height={450}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <a 
                    href="https://www.instagram.com/reel/DD_6XesPqB8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors duration-300"
                  >
                    <span className="text-white flex items-center gap-2">
                      <i className="fab fa-instagram text-xl"></i>
                      動画を見る
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <p>住所：〒465-0093 愛知県名古屋市名東区一社２丁目１４ エポック一社 1F</p>
              <p>電話：052-784-9311</p>
              <p>営業時間：9:30-18:00（土曜日は19:00まで）</p>
              <p>定休日：日曜日</p>
              <div className="mt-4 w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8601563414394!2d136.99768791744386!3d35.16786399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600365fabaac0805%3A0x49f414bdf1d872b!2z44Of44OB44Or!5e0!3m2!1sja!2sjp!4v1711603847736!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
        </div>
      </footer>

      {/* トップへ戻るボタン */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-40 bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="トップへ戻る"
      >
        <svg 
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
// スタイリングの追加
const styles = {
  sectionTitle: `
    relative
    inline-block
    text-2xl md:text-3xl lg:text-4xl
    font-bold
    text-center
    pb-2
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-1/2
    after:transform
    after:-translate-x-1/2
    after:w-12
    after:h-1
    after:bg-rose-400
  `,
};

MainComponent.propTypes = {
  // 必要に応じてpropTypesを定義
};

const Page = () => {
  return <MainComponent />;
};

export default Page;
