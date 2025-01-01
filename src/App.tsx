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

  // 表示形式の状態管理
  const [labelType, setLabelType] = useState('doremi'); // 'doremi' または 'efg'

  // 音階データ
  const notes = [
    { note: "c", doremi: "ド", efg: "C" },
    { note: "d", doremi: "レ", efg: "D" },
    { note: "e", doremi: "ミ", efg: "E" },
    { note: "f", doremi: "ファ", efg: "F" },
    { note: "g", doremi: "ソ", efg: "G" },
    { note: "a", doremi: "ラ", efg: "A" },
    { note: "b", doremi: "シ", efg: "B" },
    { note: "high_c", doremi: "高いド", efg: "High C" },
    { note: "high_d", doremi: "高いレ", efg: "High D" },
    { note: "high_e", doremi: "高いミ", efg: "High E" },
    { note: "high_f", doremi: "高いファ", efg: "High F" },
    { note: "high_g", doremi: "高いソ", efg: "High G" },
    { note: "high_a", doremi: "高いラ", efg: "High A" },
    { note: "high_b", doremi: "高いシ", efg: "High B" },
  ];

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

      {/* 音名ボタン */}
      <section>
        <h2>これはなんの音ですか？</h2>
        {notes.map(({ note, doremi, efg }, index) => (
          <button key={index} onClick={() => checkAnswer(note)}>
            {labelType === 'doremi' ? doremi : efg}
          </button>
        ))}
      </section>

      {/* 結果メッセージ */}
      {resultMessage && <p>{resultMessage}</p>}

      {/* 次の画像ボタン（ユーザーがリセットしたいとき用） */}
      <button onClick={getNextImage}>次の音符</button>

      {/* 表示形式の選択 */}
      <section>
        <h4>表示形式を選択</h4>
        <label>
          <input
            type="radio"
            name="labelType"
            value="doremi"
            checked={labelType === 'doremi'}
            onChange={() => setLabelType('doremi')}
          />
          ドレミ表示
        </label>
        <label>
          <input
            type="radio"
            name="labelType"
            value="efg"
            checked={labelType === 'efg'}
            onChange={() => setLabelType('efg')}
          />
          EFG表示
        </label>
      </section>
    </>
  );
}

export default App;
