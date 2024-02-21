export const getRandomEvenInt = (mn, mx) => {
	const minCeil = Math.ceil(mn / 2);
	const maxFloor = Math.floor(mx / 2);

	return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil) * 2;
};

export const getRandomOddInt = (mn, mx) => {
  mn = mn % 2 === 0 ? mn + 1 : mn;

  const numOdds = Math.floor((mx - mn) / 2) + 1;

  const randomIndex = Math.floor(Math.random() * numOdds);

  const randomOddInt = mn + 2 * randomIndex;

	return randomOddInt;
};

export const getRandomInt = (mn, mx) => {
	return Math.floor(Math.random() * (mx - mn));
};
