import { useEffect } from "react";

export default function PixelLoader({ onComplete }) {
  useEffect(() => {
    const img = new Image();
    img.src = "/favicon.png";

    img.onload = () => {
      const stage = document.getElementById("loader-stage");
      if (!stage) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const logoData = ctx.getImageData(0, 0, img.width, img.height).data;

      const step = 10;
      const particles = [];

      const offsetX = stage.clientWidth / 2 - img.width / 2;
      const offsetY = stage.clientHeight / 2 - img.height / 2;

      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const i = (y * img.width + x) * 4;
          if (logoData[i + 3] > 60) {
            const px = document.createElement("div");
            px.className = "pixel-glow";
            px.style.left = `${offsetX + x}px`;
            px.style.top = `${offsetY + y}px`;
            px.style.backgroundColor = `rgb(${logoData[i]}, ${logoData[i+1]}, ${logoData[i+2]})`;
            stage.appendChild(px);
            particles.push({ px, originX: offsetX + x, originY: offsetY + y });
          }
        }
      }

      const explode = () => {
        particles.forEach((p) => {
          const a = Math.random() * Math.PI * 2;
          p.px.style.transition = "1.4s ease-out";
          p.px.style.transform = `translate(${Math.cos(a) * 200}px, ${Math.sin(a) * 200}px)`;
        });
      };
      const isMobile = window.innerWidth <= 768;
      const formText = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = isMobile ? "bold 126px Orbitron, sans-serif" : "bold 200px Orbitron, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("TUTE", img.width / 2, img.height / 2 + 50);

        const textData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const points = [];

        for (let y = 0; y < img.height; y += step) {
          for (let x = 0; x < img.width; x += step) {
            const i = (y * img.width + x) * 4;
            if (textData[i + 3] > 50) {
              points.push({ x: offsetX + x, y: offsetY + y });
            }
          }
        }

        particles.forEach((p, i) => {
          const t = points[i % points.length];
          p.px.style.transition = "2s ease-in-out";
          p.px.style.transform = `translate(${t.x - p.originX}px, ${t.y - p.originY}px)`;
        });
      };

      const backToLogo = () => {
        particles.forEach((p) => {
          p.px.style.transition = "2s ease-in-out";
          p.px.style.transform = "translate(0px,0px)";
        });
      };

      setTimeout(explode, 500);
      setTimeout(formText, 2500);
      setTimeout(backToLogo, 5400);

      setTimeout(() => {
        if (typeof onComplete === "function") {
          onComplete();
        }
      }, 7600);
    };
  }, [onComplete]); // <-- useEffect closes here ✔

  return (
    <div className="pixel-loader-container">
      <div id="loader-stage"></div>
    </div>
  );
}
