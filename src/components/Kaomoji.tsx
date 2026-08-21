import React from 'react';

// Danh sách biểu tượng cảm xúc
const kaomojis = [
  // Vui
  '(≧▽≦)',
  '＼(＾▽＾)／',
  '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
  '(o´∀`o)',
  '(づ｡◕‿‿◕｡)づ',
  // Buồn
  '\\(°ˊДˋ°)/',
  '(；′⌒`)',
  '(╥﹏╥)',
  '(つ﹏<。)',
  // Tức giận
  '(ノಠ益ಠ)ノ彡┻━┻',
  '(╬ಠ益ಠ)',
  '(¬_¬”)',
  // Lo lắng / bất ngờ
  '(>_<)',
  '(⊙_☉)',
  '(°ロ°) !',
  // Mèo dễ thương
  '(=^･ω･^=)',
  "(='X'=)",
  'ฅ^•ﻌ•^ฅ',
];

// Lấy 1 biểu tượng ngẫu nhiên
function getRandomKaomoji() {
  const index = Math.floor(Math.random() * kaomojis.length);
  return kaomojis[index];
}

const Kaomoji = () => {
  const kaomoji = getRandomKaomoji();

  return (
    <span className="text-3xl select-none font-semibold text-[2.5rem] dark:text-white" title="Kaomoji ngẫu nhiên">
      {kaomoji}
    </span>
  );
};

export default Kaomoji;
