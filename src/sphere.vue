<template>
  <div>
    <div ref="sphere"></div>
  </div>
</template>

<script>
const THREE = require("three");
const TWEEN = require("@tweenjs/tween.js");
import "../utils/CSS3DRenderer.js";
import "../utils/TrackballControls.js";

export default {
  name: "sphere",
  data() {
    return {
      colors: {
        violet: "rgba(111,86,181,.3)",
        deepBlue: "rgba(29,91,175,.5)",
        shallowBlue: "rgba(0,127,127,.5)",
      },
      row: {},
      cardData: [],
      sphere: [],
      objects: [],
      controls: {},
      camera: {},
      scene: {},
      renderer: {},
      timer: null,
    };
  },
  props: {
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
    cardWrapClassName: {
      type: String,
      default: "element",
    },
    sphereSkin: {
      type: String,
      default: "violet",
    },
  },
  methods: {
    resetData() {
      this.init();
      this.animate();
      this.transform(this.sphere, 1000);
    },
    initCardData(cardData) {
      this.cardData = cardData;

      Object.keys(cardData[0]).forEach((item, i) => {
        this.row[item] = i;
      });

      this.resetData();
    },
    changeColor() {
      const sphere = this.$refs.sphere;
      const ele = [].slice.call(sphere.getElementsByClassName("details"));
      ele.forEach((item) => {
        switch (this.sphereSkin) {
          case "violet":
            item.parentNode.style.background = this.colors.violet;
            break;
          case "deepBlue":
            item.parentNode.style.background = this.colors.deepBlue;
            break;
          default:
            item.parentNode.style.background = this.colors.shallowBlue;
            break;
        }
      });
    },
    init() {
      let self = this;
      this.sphere = [];
      this.objects = [];
      this.controls = {};
      this.camera = {};
      this.scene = {};
      this.renderer = {};
      this.$refs["sphere"].innerHTML = "";

      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.z = this.spherePositionZ; // Scale size
      this.scene = new THREE.Scene();

      const generateItem = (index, item, element) => {
        // card index
        let indexWrap = document.createElement("div");
        indexWrap.className = "index";
        indexWrap.textContent = index;
        element.appendChild(indexWrap);
        for (let key in item) {
          let keyWrap = document.createElement("div");
          keyWrap.className = key;
          keyWrap.textContent = item[key];
          element.appendChild(keyWrap);
        }
      };
      // cardData

      for (var i = 0; i < this.cardData.length; i++) {
        // card wrap
        let element = document.createElement("div");
        element.className = self.cardWrapClassName;
        element.style.backgroundColor =
          "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

        generateItem(i, this.cardData[i], element);

        let object = new THREE.CSS3DObject(element);
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        this.scene.add(object);
        this.objects.push(object);
      }
      // sphere

      let vector = new THREE.Vector3();
      let spherical = new THREE.Spherical();

      for (var i = 0, l = this.objects.length; i < l; i++) {
        let phi = Math.acos(-1 + (2 * i) / l);
        let theta = Math.sqrt(l * Math.PI) * phi;
        let object = new THREE.Object3D();
        spherical.set(800, phi, theta);
        object.position.setFromSpherical(spherical);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        this.sphere.push(object);
      }

      this.renderer = new THREE.CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.domElement.style.position = "absolute";
      this.$refs["sphere"].appendChild(this.renderer.domElement);

      this.controls = new THREE.TrackballControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.rotateSpeed = 0.5;
      this.controls.minDistance = 500;
      this.controls.maxDistance = 6000;
      this.controls.addEventListener("change", this.render);
      this.controls.target.y = self.spherePositionY; // Y-axis displacement
      this.controls.target.x = -self.spherePositionX; // X-axis displacement
      window.addEventListener("resize", this.onWindowResize, false);
    },
    transform(targets, duration) {
      TWEEN.removeAll();
      for (var i = 0; i < this.objects.length; i++) {
        let object = this.objects[i];
        let target = targets[i];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      }
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start();
      this.changeColor();
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
    animate() {
      this.scene.rotation.y += 0.002;
      requestAnimationFrame(this.animate);
      TWEEN.update();
      this.controls.update();
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
<style >
</style>