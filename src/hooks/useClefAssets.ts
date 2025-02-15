import { useMemo } from 'react';
import useSound from 'use-sound';
import sound_c from '../assets/sounds/c.wav';
import sound_d from '../assets/sounds/d.wav';
import sound_e from '../assets/sounds/e.wav';
import sound_f from '../assets/sounds/f.wav';
import sound_g from '../assets/sounds/g.wav';
import sound_a from '../assets/sounds/a.wav';
import sound_b from '../assets/sounds/b.wav';
import sound_high_c from '../assets/sounds/high_c.wav';
import sound_high_d from '../assets/sounds/high_d.wav';
import sound_high_e from '../assets/sounds/high_e.wav';
import sound_high_f from '../assets/sounds/high_f.wav';
import sound_high_g from '../assets/sounds/high_g.wav';
import sound_high_a from '../assets/sounds/high_a.wav';
import sound_high_b from '../assets/sounds/high_b.wav';

// 画像の読み込み
const imageFilesTreble: Record<string, { default: string }> = import.meta.glob('../assets/images/clef_treble/*.png', { eager: true });
const imagesTreble = Object.fromEntries(
  Object.entries(imageFilesTreble).map(([key, value]) => {
    const name = key.match(/\..\/assets\/images\/clef_treble\/(.+)\.png$/)?.[1] || '';
    return [name, value.default];
  })
);

const imageFilesBass: Record<string, { default: string }> = import.meta.glob('../assets/images/clef_bass/*.png', { eager: true });
const imagesBass = Object.fromEntries(
  Object.entries(imageFilesBass).map(([key, value]) => {
    const name = key.match(/\..\/assets\/images\/clef_bass\/(.+)\.png$/)?.[1] || '';
    return [name, value.default];
  })
);

export function useClefAssets(clefType: 'treble' | 'bass') {
  // 画像
  const images = useMemo(() => (clefType === 'treble' ? imagesTreble : imagesBass), [clefType]);

  // 音ファイル
  const [play_c] = useSound(sound_c);
  const [play_d] = useSound(sound_d);
  const [play_e] = useSound(sound_e);
  const [play_f] = useSound(sound_f);
  const [play_g] = useSound(sound_g);
  const [play_a] = useSound(sound_a);
  const [play_b] = useSound(sound_b);
  const [play_high_c] = useSound(sound_high_c);
  const [play_high_d] = useSound(sound_high_d);
  const [play_high_e] = useSound(sound_high_e);
  const [play_high_f] = useSound(sound_high_f);
  const [play_high_g] = useSound(sound_high_g);
  const [play_high_a] = useSound(sound_high_a);
  const [play_high_b] = useSound(sound_high_b);

  const playSound = (note: string) => {
    const soundMap: Record<string, () => void> = {
      c: play_c,
      d: play_d,
      e: play_e,
      f: play_f,
      g: play_g,
      a: play_a,
      b: play_b,
      high_c: play_high_c,
      high_d: play_high_d,
      high_e: play_high_e,
      high_f: play_high_f,
      high_g: play_high_g,
      high_a: play_high_a,
      high_b: play_high_b,
    };
    soundMap[note]?.();
  };

  // 音階データ
  const notes = (clefType === 'treble') ?
    [
      { note: "c", doremi: "ド", efg: "C" },
    { note: "d", doremi: "レ", efg: "D" },
    { note: "e", doremi: "ミ", efg: "E" },
    { note: "f", doremi: "ファ", efg: "F" },
    { note: "g", doremi: "ソ", efg: "G" },
    { note: "a", doremi: "ラ", efg: "A" },
    { note: "b", doremi: "シ", efg: "B" },
    { note: "high_c", doremi: "高いド", efg: "C'" },
    { note: "high_d", doremi: "高いレ", efg: "D'" },
    { note: "high_e", doremi: "高いミ", efg: "E'" },
    { note: "high_f", doremi: "高いファ", efg: "F'" },
    { note: "high_g", doremi: "高いソ", efg: "G'" },
    { note: "high_a", doremi: "高いラ", efg: "A'" },
    { note: "high_b", doremi: "高いシ", efg: "B'" },
    ] : [
      { note: "e", doremi: "ミ", efg: "E" },
    { note: "f", doremi: "ファ", efg: "F" },
    { note: "g", doremi: "ソ", efg: "G" },
    { note: "a", doremi: "ラ", efg: "A" },
    { note: "b", doremi: "シ", efg: "B" },
    { note: "c", doremi: "ド", efg: "C" },
    { note: "d", doremi: "レ", efg: "D" },
    { note: "high_e", doremi: "高いミ", efg: "E'" },
    { note: "high_f", doremi: "高いファ", efg: "F'" },
    { note: "high_g", doremi: "高いソ", efg: "G'" },
    { note: "high_a", doremi: "高いラ", efg: "A'" },
    { note: "high_b", doremi: "高いシ", efg: "B'" },
    { note: "high_c", doremi: "高いド", efg: "C'" },
    { note: "high_d", doremi: "高いレ", efg: "D'" },
    ];

  return { images, playSound, notes };
}
