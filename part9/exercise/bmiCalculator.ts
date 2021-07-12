export const calculateBMI = (height: number, weight: number): string => {
  const BMI = weight / (height * height);
  return 'Normal (healthy weight)';
};

interface BMI {
  height: number;
  weight: number;
}

export const parseBmiArgs = (height: number, weight: number): BMI => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height: height,
      weight: weight
    };
  } else {
    throw new Error('Height or Weight values are not numbers!');
  }
};

export const parseBMIArgs = () => {};
