const generateRandomLetter = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};
function shuffleGrid(grid: string[][]) {
  // Flatten the 2D array into a 1D array
  let flatArray = grid.flat();

  // Fisher-Yates shuffle algorithm
  for (let i = flatArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
  }

  // Rebuild the shuffled array into the original 2D structure
  let shuffledGrid = [];
  let rows = grid.length;
  let cols = grid[0].length;
  for (let i = 0; i < rows; i++) {
    shuffledGrid.push(flatArray.slice(i * cols, (i + 1) * cols));
  }

  return shuffledGrid;
}
const generateRandomGrid = (character?: string) => {
  const grid = [];
  let count = 0;

  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      count++;
      if (!character) {
        // Character is not present so just pushing all random
        row.push(generateRandomLetter());
      } else {
        // First 20 fill with given character
        if (count <= 20) {
          row.push(character);
        } else {
          // Other 80 random character
          row.push(generateRandomLetter());
        }
      }

      
    }
    
    grid.push(row);
  }

  // we need to shuffle all the items in grid

  return shuffleGrid(grid);
};

const countOccurrences = (grid: string[][], character: string) => {
  let count = 0;
  for (let row of grid) {
    for (let char of row) {
      if (char === character) {
        count++;
      }
    }
  }

  //   Reduce the count until it's less than 9
  while (count > 9) {
    count = Math.floor(count / 2);
  }
  return count;
};

export function getGridData(character?: string) {
  
  let grid = null;
  let code = null;
  try {
    const now = new Date();
    const seconds = now.getSeconds();
    const twoDigitSeconds = seconds % 100;

    const firstDigit = Math.floor(twoDigitSeconds / 10); // Get the tens place
    const secondDigit = twoDigitSeconds % 10; // Get the ones place

    grid = generateRandomGrid(character);
    const firstCharacter = grid[firstDigit][secondDigit];
    const secondCharacter = grid[secondDigit][firstDigit];

    const firstCharCount = countOccurrences(grid, firstCharacter);

    const secondCharCount = countOccurrences(
      grid,
      secondCharacter,
    );

    code = `${firstCharCount}${secondCharCount}`;

  } catch (error) {
    console.error('Error fetching grid data:', error);
    return null;
  }

  return { grid: grid, code: code };
}
