const polarToCartesian = (theta, radius) => {
  theta = theta * (Math.PI / 180);
  return {
    x: radius * Math.cos(theta),
    y: radius * Math.sin(theta),
  };
};

const cartesianToPolar = (x, y) => {
  let theta = Math.atan2(y, x) * (180 / Math.PI);
  return {
    radius: Math.sqrt(x * x + y * y),
    theta: theta + (theta > 0 ? 0 : 360),
  };
};

export { polarToCartesian, cartesianToPolar };
