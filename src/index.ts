const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

class SineWave {
  private offset = 0;

  private color: string;

  constructor(
    private amplitude: number,
    private wavelength: number,
    private frequency: number
  ) {
    this.updateColor();
  }

  private updateColor() {
    this.color = `hsl(${Math.abs(
      Math.sin(this.offset) * this.amplitude
    )}, 68%, 55%)`;
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
      ctx.lineTo(
        i,
        canvas.height / 2 +
          ((Math.sin(i * this.wavelength + this.offset) * this.amplitude) / i) *
            this.amplitude
      );
    }

    ctx.stroke();
  }

  update(ctx: CanvasRenderingContext2D) {
    this.offset += this.frequency;

    this.updateColor();
    this.draw(ctx);
  }
}

const updateCanvas = () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

updateCanvas();

const wave = new SineWave(-200, 0.01, 0.05);

const update = () => {
  ctx.fillStyle = "rgba(20, 20, 20, 0.005)";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  wave.update(ctx);

  requestAnimationFrame(update);
};

update();
