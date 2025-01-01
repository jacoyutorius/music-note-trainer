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
      setResultMessage('不正解です😢 もう一度試してください。');
    }
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="text-3xl mt-4 font-semibold text-gray-900 dark:text-white">Music Note Trainer</p>

        <a href="#">
          <img src={images[currentImage].default} alt={currentImage} />
        </a>

        <div className="p-5">
          {/* 音名ボタン */}
          <section>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">これはなんの音ですか？</h5>

            {notes.map(({ note, doremi, efg }, index) => (
              <button key={index}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => checkAnswer(note)}>
                {labelType === 'doremi' ? doremi : efg}
              </button>
            ))}
          </section>

          {/* 結果メッセージ */}
          {resultMessage && (
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{ resultMessage }</span>
              </div>
            </div>
          )}

          {/* 次の画像ボタン（ユーザーがリセットしたいとき用） */}
          <button
            type="button"
            className="focus:outline-none mt-4 text-white bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={getNextImage}
            >次の音符</button>

          {/* 表示形式の選択 */}
          <section className="mt-4">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">表示形式を選択</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    type="radio"
                    name="labelType"
                    value="doremi"
                    checked={labelType === 'doremi'}
                    onChange={() => setLabelType('doremi')}
                  />
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ドレミ表示</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    type="radio"
                    name="labelType"
                    value="efg"
                    checked={labelType === 'efg'}
                    onChange={() => setLabelType('efg')}
                  />
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ABC表示</label>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div> 
    </>
  );
}

export default App;
