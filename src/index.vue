<template>
  <div class="relative">
    <Sphere
      ref="my-sphere"
      :cardData="cardData"
      :sphereSkin="sphereSkin"
      :spherePositionX="spherePositionX"
      :spherePositionY="spherePositionY"
      :spherePositionZ="spherePositionZ"
      :cardWrapClassName="cardWrapClassName"
    />
    <div
      v-if="showBackground"
      class="bg-container overflow"
      :style="{ width: width, height: height }"
    >
      <canvas ref="screenCanvas"></canvas>
    </div>
  </div>
</template>
<script>
import Sphere from "./sphere.vue";
import "./style/css/index.css";

export default {
  name: "duo3dSphere",
  data() {
    return {
      height: 0,
      width: 0,
      cardData: [],
    };
  },
  props: {
    showBackground: {
      type: Boolean,
      default: true,
    },
    starAmount: {
      type: Number,
      default: 2000,
    },
    starAlpha: {
      type: Number,
      default: 20,
    },
    starTail: {
      type: Number,
      default: 0.5,
    },
    starSize: {
      type: Number,
      default: 8,
    },
    starSpeedReciprocal: {
      type: Number,
      default: 200000,
    },
    starIsClockwiseRotation: {
      type: Boolean,
      default: true,
    },
    starsDiameterReciprocal: {
      type: Number,
      default: 2,
    },
    spherePositionX: {
      type: Number,
      default: 50,
    },
    spherePositionY: {
      type: Number,
      default: 50,
    },
    spherePositionZ: {
      type: Number,
      default: 3900,
    },
    table: {
      type: Array,
      default: [],
    },
    cardWrapClassName: {
      type: String,
      default: "element",
    },
    sphereSkin: {
      type: String,
      default: "violet",
    },
  },
  watch: {
    table() {
      this.table.length && this.$refs["my-sphere"].initCardData(this.table);
    },
  },
  mounted() {
    this.width = `${document.documentElement.clientWidth}px`;
    this.height = `${document.documentElement.clientHeight}px`;
    this.canvasBg(this.$refs["screenCanvas"]);
  },
  methods: {
    canvasBg(canvas) {
      let self = this,
        ctx = canvas.getContext("2d"),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        hue = 217,
        stars = [],
        count = 0,
        maxStars = this.starAmount, // star amount
        canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");

      canvas2.width = 100;
      canvas2.height = 100;

      let half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);

      gradient2.addColorStop(0.025, "#CCC");
      gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      // End cache

      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          let hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function maxOrbit(x, y) {
        let max = Math.max(x, y),
          diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / self.starsDiameterReciprocal;
        // Star range，The larger the value, the smaller the range，
      }

      let Star = function () {
        let starIsClockwiseRotation = self.starIsClockwiseRotation ? -1 : 1;
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / self.starSize;
        // Star size
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed =
          starIsClockwiseRotation *
          (random(this.orbitRadius) / (self.starSpeedReciprocal * 10000));
        // Star speed
        this.alpha = random(2, 10) / self.starAlpha;

        count++;
        stars[count] = this;
      };

      Star.prototype.draw = function () {
        let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
          y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
          twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        );
        this.timePassed += this.speed;
      };

      for (var i = 0; i < maxStars; i++) {
        new Star();
      }

      function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = self.starTail; // Star tail
        ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";

        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }

        window.requestAnimationFrame(animation);
      }
      animation();
    },
  },
  components: {
    Sphere,
  },
};
</script>
<style>
</style>
