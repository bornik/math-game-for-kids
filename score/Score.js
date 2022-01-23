import React, { useCallback, useMemo } from 'react';

export const Score = (props) => {
  const { scorePoints, className } = props;
  const getStars = useCallback((scorePoints) => {
    let starPrice = 2;
    let starCount = 0;
    let scorePointsTemp = scorePoints || 0;
    while (scorePointsTemp > 0) {
      if (scorePointsTemp < starPrice) {
        break;
        // return { starCount, scorePointsTemp }
      }
      starCount++;
      scorePointsTemp = scorePointsTemp - starPrice;
      starPrice = 2 * starPrice;
    }

    return { starCount, left: starPrice - scorePointsTemp };
  });

  const { starCount, left } = getStars(scorePoints);
  return (
    <span
      className={className}
      title={`залишилось до наступної зіроньки ${left}`}
    >
      {Array(starCount)
        .fill(0)
        .map((_, i) => '⭐️')}
      {` До ${starCount ? 'наступної' : 'першої'} зіроньки залишилось ${left} правильних відповідей`}
    </span>
  );
};
