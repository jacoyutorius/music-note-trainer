import { useState } from 'react';
import './App.css';

// 画像の読み込み
const imageFiles = import.meta.glob('./assets/images/*.png', { eager: true });
const images = Object.fromEntries(
  Object.entries(imageFiles).map(([key, value]) => {
    const name = key.match(/\.\/assets\/images\/(.+)\.png$/)[1];
    return [name, value];
  })
);

function App() {
  // 状態管理
  const [currentImage, setCurrentImage] = useState(() => {
    const imageKeys = Object.keys(images);
    return imageKeys[Math.floor(Math.random() * imageKeys.length)];
  });
  const [resultMessage, setResultMessage] = useState(''); // 結果メッセージ

  // 次の画像をランダムに選択する関数
  const getNextImage = () => {
    const imageKeys = Object.keys(images);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    setCurrentImage(randomKey);
    console.log(randomKey);
    setResultMessage(''); // メッセージをリセット
  };

  // ボタンが押されたときの検証ロジック
  const checkAnswer = (selectedNote) => {
    console.log(selectedNote, currentImage);

    // 選択された音符が正解かどうかを判定
    // トリムして比較する
    if (selectedNote.trim() === currentImage.trim()) {
      setResultMessage('正解です！🎉');
      getNextImage(); // 正解の場合は次の問題へ
    } else {
      setResultMessage('不正解です 😢 もう一度試してください。');
    }
  };

  return (
    <>
      <h1>Music Note Trainer</h1>
      <div>
        {/* 現在の画像を表示 */}
        <img src={images[currentImage].default} alt={currentImage} />
      </div>

      <section>
        <h2>これはなんの音ですか？</h2>
        {[
          { note: "c", label: "ド" },
          { note: "d", label: "レ" },
          { note: "e", label: "ミ" },
          { note: "f", label: "ファ" },
          { note: "g", label: "ソ" },
          { note: "a", label: "ラ" },
          { note: "b", label: "シ" },
          { note: "high_c", label: "高いド" },
          { note: "high_d", label: "高いレ" },
          { note: "high_e", label: "高いミ" },
          { note: "high_f", label: "高いファ" },
          { note: "high_g", label: "高いソ" },
          { note: "high_a", label: "高いラ" },
          { note: "high_b", label: "高いシ" },
        ].map(({ note, label }, index) => (
          <button key={index} onClick={() => checkAnswer(note)}>
            {label}
          </button>
        ))}
      </section>

      {/* 結果メッセージ */}
      {resultMessage && <p>{resultMessage}</p>}

      {/* 次の画像ボタン（ユーザーがリセットしたいとき用） */}
      <button onClick={getNextImage}>次の音符</button>
    </>
  );
}

export default App;
