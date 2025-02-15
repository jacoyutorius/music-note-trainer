import { useState } from 'react';
import './App.css';
// import useSound from 'use-sound';
// import sound_c from './assets/sounds/c.wav';
// import sound_d from './assets/sounds/d.wav';
// import sound_e from './assets/sounds/e.wav';
// import sound_f from './assets/sounds/f.wav';
// import sound_g from './assets/sounds/g.wav';
// import sound_a from './assets/sounds/a.wav';
// import sound_b from './assets/sounds/b.wav';
// import sound_high_c from './assets/sounds/high_c.wav';
// import sound_high_d from './assets/sounds/high_d.wav';
// import sound_high_e from './assets/sounds/high_e.wav';
// import sound_high_f from './assets/sounds/high_f.wav';
// import sound_high_g from './assets/sounds/high_g.wav';
// import sound_high_a from './assets/sounds/high_a.wav';
// import sound_high_b from './assets/sounds/high_b.wav';
import image_clef_treble from './assets/images/clef/treble.png';
import image_clef_bass from './assets/images/clef/bass.png';

import { useClefAssets } from './hooks/useClefAssets';

function App() {
  // 音部記号の状態管理
  const [clefType, setClefType] = useState<'treble' | 'bass'>('bass'); // ト音記号またはヘ音記号

  // ト音記号・ヘ音記号でそれぞれ利用するアセットの管理
  const { images, playSound, notes } = useClefAssets(clefType);

  // 状態管理
  const [currentImage, setCurrentImage] = useState(() => {
    const imageKeys = Object.keys(images);
    return imageKeys[Math.floor(Math.random() * imageKeys.length)];
  });
  const [resultMessage, setResultMessage] = useState(''); // 結果メッセージ

  // 表示形式の状態管理
  const [labelType, setLabelType] = useState('efg'); // 'ドレミ' または 'efg'

  // 画像の読み込み
  const imageSrc = images[currentImage];

  // 次の画像をランダムに選択する関数
  const getNextImage = () => {
    const imageKeys = Object.keys(images);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];

    setCurrentImage(randomKey);
    setResultMessage(''); // メッセージをリセット
  };

  // ボタンが押されたときの検証ロジック
  const checkAnswer = (selectedNote: string) => {
    playSound(selectedNote); // クリックされた音を再生

    // 選択された音符が正解かどうかを判定
    if (selectedNote === currentImage) {
      setResultMessage('正解です！🎉');
      getNextImage(); // 正解の場合は次の問題へ
    } else {
      setResultMessage('不正解です😢 もう一度試してください。');
    }
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="text-3xl mt-4 font-semibold text-gray-900 dark:text-white">なんの音？</p>
        <a href="#">
          <img src={imageSrc} alt={currentImage} />
        </a>

        <div className="p-5">
          {/* 音名ボタン */}
          <section>
            <div className="grid grid-cols-7 gap-2">
              {notes.map(({ note, doremi, efg }, index) => (
                <div>
                  <button key={index}
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-4 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => checkAnswer(note)}>
                    {labelType === 'doremi' ? doremi : efg}
                  </button>
                </div>
              ))}
            </div>
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
          >次の音</button>
          
          {/* ト音記号・ヘ音記号の切り替え */}
          <section className="mt-4">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">ト音記号・ヘ音記号</h3>
            <ul className="items-start w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex flex-col justify-start items-center ps-3">
                  <input
                    type="radio"
                    name="clefType"
                    value="treble"
                    className="my-2"
                    checked={clefType === 'treble'}
                    onChange={() => setClefType('treble') }
                  />
                  <img
                    src={image_clef_treble}
                    alt="ト音記号"
                    className="h-auto max-w-full rounded-lg"
                    width={"50%"}
                    height={"50%"}
                  />
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ト音記号</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex flex-col justify-start items-center ps-3">
                  <input
                    type="radio"
                    name="clefType"
                    value="bass"
                    className="my-2"
                    checked={clefType === 'bass'}
                    onChange={() => setClefType('bass') }
                  />
                  <img
                    src={image_clef_bass}
                    alt="ヘ音記号"
                    className="h-auto max-w-full rounded-lg my-3"
                    width={"50%"}
                    height={"50%"}
                  />
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ヘ音記号</label>
                </div>
              </li>
            </ul>
          </section>

          {/* 表示形式の選択 */}
          <section className="mt-4">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">表示形式</h3>
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
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ドレミ</label>
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
                  <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ABC</label>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <footer className="bg-white m-2 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://twitter.com/jacoyutorius" className="hover:underline">@jacoyutorius</a>. All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
