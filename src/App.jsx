import React, { useState } from 'react';
import CompanyCard from './CompanyCard';

const DUMMY_COMPANIES = [
    { id: 1, name: '株式会社TechNext', industry: 'IT・ソフトウェア', description: '最先端のAI技術を駆使したSaaSプロダクトを開発・提供しています。自由な社風が魅力です。', logo: 'https://via.placeholder.com/150/007BFF/FFFFFF?Text=TN' },
    { id: 2, name: 'Global Foods株式会社', industry: '食品・メーカー', description: '世界中の食卓に笑顔を届ける食品メーカー。持続可能な社会を目指した商品開発に注力。', logo: 'https://via.placeholder.com/150/28A745/FFFFFF?Text=GF' },
    { id: 3, name: 'クリエイティブ・デザイン社', industry: '広告・デザイン', description: '大手企業のブランディングからWebデザインまで幅広く手がけるデザインファームです。', logo: 'https://via.placeholder.com/150/FFC107/000000?Text=CD' },
    { id: 4, name: 'ライフスタイル不動産', industry: '不動産', description: '「暮らし」をデザインする新しい形の不動産会社。リノベーション物件に強み。', logo: 'https://via.placeholder.com/150/DC3545/FFFFFF?Text=LR' },
    { id: 5, name: 'Next-Genコンサルティング', industry: 'コンサルティング', description: '企業のDX推進を支援する戦略コンサルティングファーム。若手が多く活躍中。', logo: 'https://via.placeholder.com/150/17A2B8/FFFFFF?Text=NC' }
];

function App() {
  const [companies, setCompanies] = useState(DUMMY_COMPANIES);
  const [likedCompanies, setLikedCompanies] = useState([]);
  // 'swipe' or 'list' のどちらかを表示するための新しいステート
  const [view, setView] = useState('swipe'); 

  const currentCompany = companies.length > 0 ? companies[companies.length - 1] : null;

  // スワイプまたはボタンクリック時の共通処理
  const handleSwipe = (swipedCompany, direction) => {
    if (!swipedCompany) return; // 対象の会社がなければ何もしない

    if (direction === 'right') {
      setLikedCompanies(prev => [...prev, swipedCompany]);
    }
    
    setCompanies(prev => prev.filter(c => c.id !== swipedCompany.id));
  };

  // JSXの条件分岐を読みやすくするためのフラグ
  const isSwipeView = view === 'swipe';
  const isListView = view === 'list';

  return (
    <>
      {/* スワイプ画面の表示 */}
      {isSwipeView && (
        <div id="app-container">
          <div id="card-container">
            <div id="swipe-indicator"></div>
            
            {currentCompany ? (
              <CompanyCard
                key={currentCompany.id}
                company={currentCompany}
                onSwipe={handleSwipe}
              />
            ) : (
              <p>全ての企業を見終わりました！</p>
            )}
          </div>
          
          <div id="action-buttons">
            <button id="skip-btn" onClick={() => handleSwipe(currentCompany, 'left')}>興味なし</button>
            <button id="like-btn" onClick={() => handleSwipe(currentCompany, 'right')}>興味あり</button>
          </div>

          <button id="show-liked-list-btn" onClick={() => setView('list')}>興味ありリストを見る</button>
        </div>
      )}

      {/* 興味ありリスト画面の表示 */}
      {isListView && (
        <div id="liked-list-container">
          <h2>興味のある企業リスト</h2>
          <div id="liked-list">
              {likedCompanies.length > 0 ? (
                likedCompanies.map(company => (
                    <div key={company.id} className="liked-item">
                        <h3>{company.name}</h3>
                        <p>{company.industry}</p>
                    </div>
                ))
              ) : (
                <p>まだ興味のある企業はありません。</p>
              )}
          </div>
          <button id="back-to-swipe-btn" onClick={() => setView('swipe')}>カード選択に戻る</button>
        </div>
      )}
    </>
  );
}

export default App;
