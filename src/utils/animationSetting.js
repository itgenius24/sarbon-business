
export const fadeInUp = {
  hidden: {
    y: -80,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 6000, velocity: -100 } },
  },
};

export const fadeinLeft = {
  hidden: {
    x: -80,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      x: { stiffness: 6000, velocity: -100 }
    },
  },
};

export const fadeinDown = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y:10,
    opacity: 1,
    transition: { x: { stiffness: 120000, velocity: -100 } },
  },
};
export const fadeinLeftFura = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x:30,
    opacity: 1,
    // transition: { y: { stiffness: 10000, velocity: -100 } },
  },
};
export const fadeinRightFura = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x:30,
    opacity: 1,
    // transition: { y: { stiffness: 10000, velocity: -100 } },
  },
};

export const productFadeinDown = {
  hidden: {
    y: 200,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
};
export const phoneFadeinDown = {
  hidden: {
    y: 200,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.8,
    },
  },
};
export const containerAnimation = {
  hidden: {},
  visible: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.07,
      delayChildren: 0.2
    },
  }
}
export const textFadeinDown = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
};

export const fadeinDownPhone = {
  hidden: {
    y: 160,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { x: { stiffness: 6000, velocity: -100 } },
  },
};

export const fadeinRight = {
  hidden: {
    x: 180,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      x: { stiffness: 6000, velocity: -100 }
    },
  },
};

export const fadeInUpScaleDown = {
  hidden: {
    y: 80,
    opacity: 0,
    scale: 1.4,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { y: { stiffness: 6000, velocity: -500 } },
  }
}
