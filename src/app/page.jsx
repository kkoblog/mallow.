"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle }) => (
  <div className="relative mb-8 md:mb-12 px-4">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
      <span className="relative inline-block pb-4">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFC6BD]"></span>
      </span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-lg lg:text-xl text-gray-600 text-center">
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

// Instagramの埋め込みを最適化
const InstagramEmbed = ({ url }) => {
  return (
    <div className="w-full aspect-[9/16] max-w-[280px] mx-auto">
      <iframe 
        src={url}
        className="w-full h-full"
        frameBorder="0" 
        scrolling="no" 
        allowtransparency="true"
      />
    </div>
  );
};

// スタッフカードコンポーネントを修正して動画対応を追加
const StaffCard = ({ image, name, position, message, instagramUrl, videoUrl }) => {
  return (
    <div className="bg-[#f5f5f5] p-4 md:p-8 rounded-xl shadow-sm">
      <div className="bg-white/80 p-6 rounded-xl shadow-sm h-full flex flex-col">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-quote-left text-[#FF998A] text-xl"></i>
          <span className="text-[#FF998A] font-medium"></span>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 border-white shadow-md mr-4 flex-shrink-0">
            <Image
              src={image}
              alt={`スタッフ${name}`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            {message}
          </p>
        </div>
        
        {videoUrl ? (
          <div className="w-full aspect-video max-w-[500px] mx-auto">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full rounded-lg"
              preload="metadata"
            />
          </div>
        ) : instagramUrl ? (
          <InstagramEmbed url={instagramUrl} />
        ) : null}
      </div>
    </div>
  );
};

// スライドショーコンポーネントを追加
const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/image/gaikan.jpg",
      alt: "外観の様子"
    },
    {
      src: "/image/naisou.jpg",
      alt: "店内の様子"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[1/1] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[1/1] overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ${
            currentImageIndex === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 768px) 80vw,
                   (max-width: 1024px) 70vw,
                   60vw"
            className="object-cover object-center"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
      
      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
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
    "「人気サロンで技術を磨きたい」と思い入社したものの、先輩からの厳しい監視と指導で人間不信に💦",
    "「推しのライブがあるから休みたい」と言えない雰囲気。休みを申請しても「みんな我慢してるから」と却下される毎日💦",
    "「人から悪く思われたくない」という気持ちから無理をし続け、心身ともに疲弊。家庭の複雑な事情も相談できず孤独感が増す💦",
    "「もっと頑張らないと」というプレッシャーで心が休まらない。重責を任されすぎてキャパオーバーになっても弱音を吐けない日々💦",
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

  // 特徴セクション用のIntersectionObserver設定を追加
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  // アニメーション制御用のstateを追加
  const [startAnimation, setStartAnimation] = useState(false);

  // contentInViewが変更されたときに1秒後にアニメーションを開始
  useEffect(() => {
    if (contentInView) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation(false);
    }
  }, [contentInView]);

  // 各セクション用のアニメーション制御stateを追加
  const [startAnimation1, setStartAnimation1] = useState(false);
  const [startAnimation2, setStartAnimation2] = useState(false);
  const [startAnimation3, setStartAnimation3] = useState(false);

  // 各セクションのIntersectionObserver設定
  const [section1Ref, section1InView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [section2Ref, section2InView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [section3Ref, section3InView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  // 各セクションが表示されたときに1秒後にアニメーションを開始
  useEffect(() => {
    if (section1InView) {
      const timer = setTimeout(() => {
        setStartAnimation1(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation1(false);
    }
  }, [section1InView]);

  useEffect(() => {
    if (section2InView) {
      const timer = setTimeout(() => {
        setStartAnimation2(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation2(false);
    }
  }, [section2InView]);

  useEffect(() => {
    if (section3InView) {
      const timer = setTimeout(() => {
        setStartAnimation3(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation3(false);
    }
  }, [section3InView]);

  const RequirementSection = () => {
    const requirements = [
      {
        main: "家族との時間を大切にしながらキャリアを築きたい方",
        sub: "自社託児所完備・時短勤務OK・働く時間を選べる環境で、子育てと両立したい方"
      },
      {
        main: "花に囲まれた癒しの空間で高単価サロンを目指したい方",
        sub: "名古屋唯一の花屋併設美容院で、平均単価¥15,000の高生産性を実現したい方"
      },
      {
        main: "早期スタイリストデビューと多彩なキャリアを望む方",
        sub: "1-2年以内の確実なスタイリストデビューと、アイリスト・ブライダル事業など複数のスキルを身につけたい方"
      },
      {
        main: "会社からの手厚いサポートで売上アップを目指したい方",
        sub: "最高レベルの集客サポートで、月200-300万円の売上実績を持つスタイリストから成功の秘訣を学びたい方"
      },
      {
        main: "自分のアイデアや「やりたい」を形にできる環境を求める方",
        sub: "ネイル・エステ事業など新しい挑戦を応援する、みんなの「やりたい」を形にする会社で働きたい方"
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

    
        
        <div className="max-w-6xl mx-auto px-4">
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
                    <div className="w-6 h-6 bg-[#FF998A]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#FF998A] text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 w-full">
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
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
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
            <video
              src="marouhead.MP4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-white px-4 md:px-8 text-center space-y-8">
                <p className="text-base md:text-2xl font-medium mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                  ＝＝＝＝＝＝＝＝<br />
                  ＝＝＝＝＝＝＝＝<br />
                  ＝＝＝＝＝＝＝＝
                </p>
                
                <p className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
                  ＝＝＝＝＝＝＝<br />
                  ＝＝＝＝＝＝＝＝＝
                </p>
                
                <div className="relative">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-0 blur-sm" id="blurText">
                    <span className="inline-block">花屋併設の美容院 mallow（マロウ）</span>
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

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
        <Link 
          href="/contact" 
          className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
        >
          応募する
        </Link>
        <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
          代表永田からのメッセージを見る
        </button>
      </div>

      <div className="mt-8 md:mt-12 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-4 text-xl md:text-2xl font-medium text-gray-800">
          まずはこの3分動画をご覧ください
        </div>
        <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden">
          <video 
            src="/nagatasann.MP4" 
            controls 
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
      </div>

      <section className="py-16 md:py-24 mt-8 md:mt-12">
        <SectionHeader 
          title="世の中の女性美容師さんが抱える悩み事、当サロンでは一切致しません"
          subtitle="現場で女性美容師さんを困らせること"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-8">
            {/* 左側: 一般的な美容室の悩み */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-gray-600">＜他店＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {concerns.map((concern, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-gray-200 rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed whitespace-pre-line`}
                    >
                      {concern}
                    </div>
                    
                    {index < concerns.length - 1 && (
                      <div className="text-gray-400 text-base md:text-2xl">
                        ↓
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 右側: mallowでの解決策 */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-[#FF998A]">＜mallowの場合＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "厳しい監視や指導はなく、平均15,000円以上の高単価サロンで安定した環境。「恩送り」の理念のもと、受けた恩を次に繋ぎ互いを認め合う文化✨",
                  "「休みを申請しても却下される」ことはなく、「推しのライブには行け」は当サロンの10か条の一つ。年間3〜4回のライブ参加OK！✨",
                  "無理をし続ける必要はなく、「いいところを見つけよう」という文化が根付いています。本音で話せる仲間ができる環境✨",
                  "プレッシャーや重責で疲弊することなく、心理的安全性を保ち、好きな美容師という仕事をより好きになり、周りにも幸せを配れます✨"
                ].map((solution, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className={`border-2 border-[#FF998A] rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm transition-all duration-500 text-xs md:text-base leading-relaxed`}
                    >
                      {solution}
                    </div>
                    
                    {index < 3 && (
                      <div className="text-[#FF998A] text-base md:text-2xl">
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
        <SectionHeader 
          title="mallowの特徴"
          
        />

         
<div className="mt-8 md:mt-12 px-4 max-w-6xl mx-auto">
  <div 
    className={`max-w-lg mx-auto transition-all duration-1000 ${
      featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <ImageSlideshow />
  </div>
</div>

          <br />

          <div 
            ref={featuresRef}
            className="text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto space-y-6"
          >
            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="text-[#FF998A] font-bold text-lg">①</span>
              365日季節のお花に囲まれた、心安らぐ癒しの空間
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                名古屋唯一の花屋併設美容院として、季節のお花に囲まれながら施術ができます。お花好きのお客様との自然な会話が生まれ、癒しの空間で心地よく働けます。お花に魅かれて来店されるお客様も多く、まるでお花カフェのような温かな雰囲気の中で、新しい美容師ライフをスタートできます。
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="text-[#FF998A] font-bold text-lg">②</span>
              互いを認め合える、優しい仲間たち
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                「誰かを批判するのではなく、いいところを見つけよう」という文化が根付いています。平均単価15,000円以上の安定した環境で、焦ることなく成長できます。新人教育も丁寧で、先輩からの過度な監視や重圧を感じることなく、安心して技術を磨けます。
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <span className="text-[#FF998A] font-bold text-lg">③</span>
              推しのために休める、充実の休暇制度
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                年間3〜4回のライブ参加ok！完全週休2日制と自由休暇5日でしっかりサポート。「推しのライブには行け」は当サロンの10か条の一つです。プライベートも仕事も大切にできる、あなたの理想の働き方を実現できます。
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="mallowで働くことで得られる事"
          subtitle="あなたらしい働き方"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            <div 
              ref={section1Ref}
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                大好きな美容師がもっと楽しめるようになる
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0 relative">
                  <Image
                    src="/image/erarerukoto.JPG"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/image/erarerukoto2.jpg"
                      alt="スタッフの様子2"
                      width={400}
                      height={300}
                      className="w-full h-[400px] md:h-[300px] rounded-lg object-cover opacity-0"
                      style={{
                        animation: startAnimation1 ? 'blurReveal 3s ease-in-out forwards' : 'none'
                      }}
                      priority={true}
                    />
                  </div>
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、疲弊する人間関係とはおさらば、本当の意味で信頼できる仲間に出会え生涯を通しての付き合いも。心にも余裕ができ プライベートも充実します。
                </p>
              </div>
            </div>

            <div 
              ref={section2Ref}
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                仕事で海外にいけるチャンスがある
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0 relative">
                  <Image
                    src="/image/kaigai.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/image/kaigai2.jpg"
                      alt="スタッフの様子2"
                      width={400}
                      height={300}
                      className="w-full h-[400px] md:h-[300px] rounded-lg object-cover opacity-0"
                      style={{
                        animation: startAnimation2 ? 'blurReveal 3s ease-in-out forwards' : 'none'
                      }}
                      priority={true}
                    />
                  </div>
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/image/kaigai3.jpg"
                      alt="スタッフの様子3"
                      width={400}
                      height={300}
                      className="w-full h-[400px] md:h-[300px] rounded-lg object-cover opacity-0"
                      style={{
                        animation: startAnimation2 ? 'blurReveal 3s ease-in-out 3.5s forwards' : 'none'
                      }}
                      priority={true}
                    />
                  </div>
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、1人では中々叶えられないビジョンを会社と共叶えることができる。昨年はマレーシアでヘアメイクのお仕事をしました。今年は韓国にもお仕事で行く予定です！
                </p>
              </div>
            </div>

            <div 
              ref={section3Ref}
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                CSR(社会貢献)にも積極的なので好きな仕事で貢献できるチャンスがある
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0 relative">
                  <Image
                    src="/image/kouken.jpg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/image/kouken2.jpg"
                      alt="スタッフの様子2"
                      width={400}
                      height={300}
                      className="w-full h-[400px] md:h-[300px] rounded-lg object-cover opacity-0"
                      style={{
                        animation: startAnimation3 ? 'blurReveal 3s ease-in-out forwards' : 'none'
                      }}
                      priority={true}
                    />
                  </div>
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src="/image/kouken3.jpg"
                      alt="スタッフの様子3"
                      width={400}
                      height={300}
                      className="w-full h-[400px] md:h-[300px] rounded-lg object-cover opacity-0"
                      style={{
                        animation: startAnimation3 ? 'blurReveal 3s ease-in-out 3.5s forwards' : 'none'
                      }}
                      priority={true}
                    />
                  </div>
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  これにより、毎日がHAPPYに！若いうちから社会貢献に触れることで人に優しく仲間想いにと、人間性が高められ波動の良い組織に入られます。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <SectionHeader 
          title="現場仕事の日のとある1日（早番）"
          
        />
              
              
              <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  {[
                    { time: "9:00", activity: "出勤＆朝練（朝練を推奨しています）" },
                    { time: "9:30", activity: "掃除＆お花の水替え" },
                    { time: "10:00", activity: "営業開始" },
                    { time: "12:00", activity: "本日2人目のお客様（カットカラートリートメント２時間施術）" },
                    { time: "14:00", activity: "お昼ご飯（随時順番に）" },
                    { time: "16:00", activity: "おやつタイム（各店舗おやつボックスがある）" },
                    { time: "18:30", activity: "早番帰りの掃除" },
                    { time: "19:00", activity: "退勤" },
                  ].map((schedule, index) => (

                    <div 
                      key={index}
                      className="flex items-center gap-6 p-4 hover:bg-[#D3B58D]/5 rounded-lg transition-colors duration-300"
                    >
                      <div className="w-24 flex-shrink-0">
                        <span className="font-bold text-[#FF998A]">{schedule.time}</span>
                      </div>
                      <div className="flex-grow">
                        <span className="text-gray-700">{schedule.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
               
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
      <SectionHeader 
          title="働く仲間へインタビュー"
          subtitle="スタッフの声"
        />
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            <StaffCard 
              image="/image/aoi.jpg"
              name="あおい"
              position="入社4年目 / スタイリスト"
              videoUrl="/sutahhu.MP4"
            />
            {/* 必要に応じて追加のStaffCardを配置 */}
          </div>
        </div>
      </section>

    

<section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
  <SectionHeader 
    title="募集要項"
    subtitle="採用情報"
  />
  <div className="max-w-6xl mx-auto px-4">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {[
        {
          title: "勤務地",
          content: "愛知県名古屋市中区丸の内2-19-19丸の内ヒルズ3F"
        },
        {
          title: "募集職種",
          content: "スタイリスト"
        },
        {
          title: "募集形態",
          content: "正社員、時短社員、パート"
        },
        {
          title: "給与",
          content: (
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-2">基本給</p>
                <p className="text-gray-600">スタイリスト：215,000円～＋手当</p>
              </div>
              <div>
                <p className="font-medium mb-2">歩合給例</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">技術売上110万円の場合</p>
                  <p className="text-gray-600">110万-66万(基本給)÷1.1(消費税)×45%+23万(基本給)＝41万円</p>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">時短勤務の場合</p>
                <div className="space-y-2 text-gray-600">
                  <p>2時間時短：</p>
                  <ul className="list-disc list-inside ml-4">
                    <li>215,000円×6/8＝161,250円</li>
                    <li>230,000円×6/8＝172,500円</li>
                  </ul>
                  <p>3時間時短：</p>
                  <ul className="list-disc list-inside ml-4">
                    <li>215,000円×5/8＝134,375円</li>
                    <li>230,000円×5/8＝143,750円</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "休日",
          content: (
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>完全週休2日</li>
              <li>夏季休暇2日</li>
              <li>自由休暇5日(11日)</li>
              <li>年末年始5日</li>
              <li>半休2日(有給1日)</li>
              <li>土日休みあり</li>
            </ul>
          )
        },
        {
          title: "待遇",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>推し活応援</li>
                  <li>早番＆遅番制度あり</li>
                  <li>時短勤務あり</li>
                  <li>交通費15,000円まで支給 ※店舗により車通勤サポートあり</li>
                  <li>自転車通勤5,000円支給</li>
                  <li>住宅手当10,000円支給</li>
                  <li>役職手当10,000円支給</li>
                  <li>子供手当あり（0-6歳：10,000円、7-15歳：5,000円）</li>
                  <li>フリー入客も歩合率45%～</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>アイリスト兼任/歩合率10%</li>
                  <li>ブライダル事業あり</li>
                  <li>託児所付き/子供を預けて働ける</li>
                  <li>ヘアスク導入サロン</li>
                  <li>講習手当/半額支給</li>
                  <li>予約状況で早上がり有り</li>
                  <li>夜練ナシ朝練推奨/営業内に講習</li>
                  <li>全席iPad完備/フルフラットユメスイー</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500">※パートの場合は出勤日数や労働時間により待遇が異なります。</p>
              </div>
            </div>
          )
        },
        {
          title: "福利厚生",
          content: "社会保険完備（健康保険/厚生年金/雇用保険/労災）"
        }
      ].map((item, index) => (
        <div 
          key={index}
          className={`flex flex-col md:flex-row border-b border-gray-100 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="w-full md:w-1/4 p-4 md:p-6 bg-[#D3B58D]/5">
            <h4 className="font-bold text-gray-800">{item.title}</h4>
          </div>
          <div className="w-full md:w-3/4 p-4 md:p-6">
            {typeof item.content === 'string' ? (
              <p className="text-gray-600">{item.content}</p>
            ) : (
              item.content
            )}
          </div>
        </div>
      ))}
    </div>

    
  </div>
</section>



      <RequirementSection />

      <section className="py-16 md:py-24" id="qa" ref={qaRef}>
        <SectionHeader 
          title="よくあるご質問"
          subtitle="Q&A"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4">
            {[
              {
                question: "スタッフの年齢はどのくらいですか？",
                answer: "店舗によってもかわりますが平均年齢25歳くらいの若い層が活躍しているサロンです。みんな仲良く推し活頑張ってます！"
              },
              {
                question: "お客様の年齢層は？",
                answer: "20-30代がメイン層になります！カラー好きなスタッフが多くカラー比率は70%以上！髪質改善などのケア系カラーはもちろんですがデザインカラーも豊富です！"
              },
              {
                question: "採用までの流れはどんな感じですか？",
                answer: "まずサロン見学に来て下さい！オーナーの永田が1人ずつしっかりお話しさせて頂きます。会社の考え方、理念などにしっかり共感できる方のみ採用させて頂きます。"
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
                    src="/image/nagata.jpg"
                    alt="オーナーの写真"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">オーナー</h3>
                <p className="text-gray-600 mb-6 md:mb-0">永田</p>
              </div>
              
              <div className="md:w-2/3">
                <div className="prose prose-sm md:prose-lg max-w-none">
                  <p className="space-y-4 md:space-y-6">
                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      皆さま、こんにちは。名古屋で「mallow」「re'll」「mallow eve」の3店舗を運営しております、オーナーの永田です。この度は、私たちのサロンにご興味を持っていただき、ありがとうございます。 私たちのサロンは、ただの美容院ではなく、スタッフ一人ひとりの「なりたい」「やりたい」を叶えられる場所でありたいと考えています。ここでは、お客様に最高の美容体験を提供することはもちろんですが、スタッフが自分らしく、そして充実した仕事をしていける環境を整えることを何より大切にしています。 
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      「美容師として技術を磨きたい」「もっとクリエイティブな仕事がしたい」「ライフスタイルに合わせた働き方がしたい」「美容師以外にも興味がある」
                      — そんな思いを持った方にこそ、私たちのサロンはぴったりの場所だと自負しています。私たちは、スタッフ一人ひとりの成長を全力でサポートし、それぞれが持つ個性を活かして活躍できる環境を提供します。 
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      また、働き方についても、柔軟な選択肢を大切にしています。フルタイム勤務だけでなく、時短勤務やパートタイム、託児所(mallow kids)を併設しているので、お子さんを預けて働くこともできます！
                      スタッフが自分のペースで働き、仕事とプライベートのバランスを取りながら、キャリアを築いていける環境を整えているので、どんな希望にも柔軟に対応できるように努めています。
                    </span>
s
                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      さらに、当サロンでは技術だけではなく、人間力の向上も大切にしています。お客様に感動を与える美容師であり続けるために、日々学びながら成長できるチャンスがあります。
                      例えば、定期的な勉強会やワークショップ、そしてスタッフ同士での交流を通じて、技術だけでなく、サロン内でのコミュニケーション力やチームワークも高めていきます。
                    </span>

                    <span className="block mb-4 md:mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
                      私たちのサロンで働くということは、美容師としてだけでなく、一人の人間としても成長できるチャンスに満ちています。あなたの「なりたい自分」を実現し、共に成長していける場所がここにあります。 もし、少しでも興味を持っていただけたのであれば、ぜひ一度、サロンに足を運んでいただければと思います。お話を聞かせていただき、あなたが持つビジョンや目標にどう応えていけるか、一緒に考えていきたいと考えています。
                    </span>
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4 flex items-center">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  
                  <a 
                    href="https://www.instagram.com/mallow_nagata/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">代表永田</span>
                  </a>
                </div>
                
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <div className="mb-4">
                <Image
                  src="/image/zentai.jpg"
                  alt="店舗外観"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p>住所：〒460-0002 愛知県名古屋市中区丸の内2-19-19丸の内ヒルズ3F</p>
              <p>電話：052-253-8467</p>
              <p>営業時間：
                <br />※最終受付時間となります。
                <br />【火～土】10:00～20:00
                <br />【日】10:00～18:00
              </p>
              <p>定休日：月曜日</p>
              <div className="mt-4 w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.0551669939396!2d136.89851287619566!3d35.18857197275282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e5cf4e2bb9%3A0xb8c55047e62e557b!2zmallow!5e0!3m2!1sja!2sjp!4v1711604847736!5m2!1sja!2sjp"
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
      >
        <span className="sr-only">トップへ戻る</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  return <MainComponent />;
}