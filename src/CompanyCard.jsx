import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';

function CompanyCard({ company, onSwipe }) {
  // カードの現在の位置や角度を管理するステート
  const [style, setStyle] = useState({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1
  });

  // useDragフックでドラッグ操作をハンドル
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    // スワイプの強さを判定するトリガー（速度が0.2以上）
    const trigger = vx > 0.2;
    // スワイプ方向（右なら1, 左なら-1）
    const dir = xDir > 0 ? 1 : -1;

    // マウスボタンが離されて、かつスワイプが十分な強さだった場合
    if (!down && trigger) {
      // 親コンポーネントにスワイプ方向を通知
      onSwipe(company, dir === 1 ? 'right' : 'left');
      return; // この後の処理はしない
    }

    // ドラッグ中のスタイルを更新
    setStyle({
      x: down ? mx : 0, // ドラッグ中ならマウスのX移動量、そうでなければ0
      y: 0, // Y方向には動かさない
      rotate: mx / 15, // X移動量に応じてカードを傾ける
      opacity: 1 - Math.min(Math.abs(mx) / 500, 1) // X移動量に応じて透明度を変える
    });
  });

  // ドラッグ中のスタイルを動的に適用
  const dynamicStyle = {
    transform: `translateX(${style.x}px) rotate(${style.rotate}deg)`,
    opacity: style.opacity,
  };

  if (!company) return null;

  // {...bind()} をdivに適用することで、ドラッグ操作が可能になる
  return (
    <div {...bind()} className="company-card" style={dynamicStyle}>
      <img src={company.logo} alt={`${company.name}のロゴ`} className="card-logo" />
      <div className="card-header">
          <h2>{company.name}</h2>
          <span className="industry">{company.industry}</span>
      </div>
      <div className="card-content">
          <p>{company.description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
