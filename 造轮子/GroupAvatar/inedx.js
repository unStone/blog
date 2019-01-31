import {
  newRequestIdleCallback,
  newCancelIdleCallback
} from './requestIdleCallback';

const numLined = scale => ({
  2: [
    [40 * scale, 150 * scale, 200 * scale, 200 * scale],
    [260 * scale, 150 * scale, 200 * scale, 200 * scale]
  ],
  3: [
    [150 * scale, 20 * scale, 200 * scale, 200 * scale],
    [50 * scale, 230 * scale, 200 * scale, 200 * scale],
    [260 * scale, 230 * scale, 200 * scale, 200 * scale]
  ],
  4: [
    [60 * scale, 70 * scale, 180 * scale, 180 * scale],
    [250 * scale, 70 * scale, 180 * scale, 180 * scale],
    [60 * scale, 260 * scale, 180 * scale, 180 * scale],
    [250 * scale, 260 * scale, 180 * scale, 180 * scale]
  ],
  5: [
    [120 * scale, 120 * scale, 120 * scale, 120 * scale],
    [280 * scale, 120 * scale, 120 * scale, 120 * scale],
    [50 * scale, 260 * scale, 120 * scale, 120 * scale],
    [190 * scale, 260 * scale, 120 * scale, 120 * scale],
    [330 * scale, 260 * scale, 120 * scale, 120 * scale]
  ],
  6: [
    [50 * scale, 120 * scale, 120 * scale, 120 * scale],
    [190 * scale, 120 * scale, 120 * scale, 120 * scale],
    [330 * scale, 120 * scale, 120 * scale, 120 * scale],
    [50 * scale, 260 * scale, 120 * scale, 120 * scale],
    [190 * scale, 260 * scale, 120 * scale, 120 * scale],
    [330 * scale, 260 * scale, 120 * scale, 120 * scale]
  ],
  7: [
    [80 * scale, 80 * scale, 100 * scale, 100 * scale],
    [200 * scale, 80 * scale, 100 * scale, 100 * scale],
    [320 * scale, 80 * scale, 100 * scale, 100 * scale],
    [80 * scale, 200 * scale, 100 * scale, 100 * scale],
    [200 * scale, 200 * scale, 100 * scale, 100 * scale],
    [320 * scale, 200 * scale, 100 * scale, 100 * scale],
    [80 * scale, 320 * scale, 100 * scale, 100 * scale]
  ],
  8: [
    [80 * scale, 80 * scale, 100 * scale, 100 * scale],
    [200 * scale, 80 * scale, 100 * scale, 100 * scale],
    [320 * scale, 80 * scale, 100 * scale, 100 * scale],
    [80 * scale, 200 * scale, 100 * scale, 100 * scale],
    [200 * scale, 200 * scale, 100 * scale, 100 * scale],
    [320 * scale, 200 * scale, 100 * scale, 100 * scale],
    [80 * scale, 320 * scale, 100 * scale, 100 * scale],
    [200 * scale, 320 * scale, 100 * scale, 100 * scale]
  ],
  9: [
    [80 * scale, 80 * scale, 100 * scale, 100 * scale],
    [200 * scale, 80 * scale, 100 * scale, 100 * scale],
    [320 * scale, 80 * scale, 100 * scale, 100 * scale],
    [80 * scale, 200 * scale, 100 * scale, 100 * scale],
    [200 * scale, 200 * scale, 100 * scale, 100 * scale],
    [320 * scale, 200 * scale, 100 * scale, 100 * scale],
    [80 * scale, 320 * scale, 100 * scale, 100 * scale],
    [200 * scale, 320 * scale, 100 * scale, 100 * scale],
    [320 * scale, 320 * scale, 100 * scale, 100 * scale]
  ]
});

function circleImg(ctx, img, r) {
  ctx.save();
  const d = 2 * r;
  ctx.arc(r, r, r, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(img, 0, 0, d, d);
  ctx.restore();
}

function drawCircle(img, r) {
  const c = document.createElement('canvas');
  c.width = r * 2;
  c.height = r * 2;
  const ctx = c.getContext('2d');
  circleImg(ctx, img, r);
  return c;
}

// const defaultAvatarImg = null;

// function getDefaultAvatar() {
//   if(defaultAvatarImg) return defaultAvatarImg;

//   const img = new Image();
//   img.src = defaultAvatar;
//   img.onload = () => {
//     defaultAvatarImg = img;
//   };
// }
// getDefaultAvatar()

export default class GroupAvatar {
  constructor(props) {
    if (props.length > 9) {
      this.data = props.slice(0, 9);
      this.len = 9;
    } else {
      this.data = props;
      this.len = props.length;
    }
    this.tasks = [];
    this.c = document.createElement('canvas');
    this.c.width = 1000;
    this.c.height = 1000;

    this.ctx = this.c.getContext('2d');
    this.ctx.rect(0, 0, this.c.width, this.c.height);
    this.ctx.fillStyle = '#EEE';
    this.ctx.fill();
  }

  // 有空余时间再做事情
  requestIdleCallback = () =>
    newRequestIdleCallback(deadline => {
      while (
        (deadline.timeRemaining() > 5 || deadline.didTimeout) &&
        this.tasks.length > 0
      ) {
        this.tasks.shift()();
      }

      if (this.tasks.length > 0) this.requestIdleCallback();

      if (this.tasks.length === 0)
        newCancelIdleCallback(this.requestIdleCallback);
    });

  everDraw = (img, indexLined, callback) => {
    const circleCanvas = drawCircle(
      img,
      indexLined[0],
      indexLined[1],
      indexLined[2] / 2
    );
    this.ctx.drawImage(
      circleCanvas,
      indexLined[0],
      indexLined[1],
      indexLined[2],
      indexLined[3]
    );
    callback();
  };

  getImage = (src, index, lined, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.tasks.push(() => {
        this.everDraw(img, lined[index], callback);
      });
      if (index === 1) this.requestIdleCallback();
    };
    img.onerror = () => {
      callback();
    };
  };

  drawing(call) {
    if (this.len === 1) {
      call(this.data[0]);
      return;
    }

    const lined = numLined(2)[this.len];
    let i = 0;
    let complete = 0;

    const callback = () => {
      complete += 1;
      if (i === complete) {
        call(this.c.toDataURL('image/jpg'));
      }
    };

    while (i < this.len) {
      this.getImage(this.data[i], i, lined, callback);
      i += 1;
    }
  }
}
