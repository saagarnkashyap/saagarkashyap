import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadFull } from "tsparticles"; // using full version for full color support

const Particle = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: [
            "#ffffff",   // white
            "#ffb6c1",   // light pink
            "#add8e6",   // light blue
            "#ffffe0",   // light yellow
            "#d6aefe",   // pastel purple
            "#f5a623",   // amber/orange
            "#ffcba4",   // light apricot
            "#ffd580",   // peach/orange
          ],
        },
        links: {
          color: [
            "#ffffff",
            "#ffb6c1",
            "#add8e6",
            "#ffffe0",
            "#d6aefe",
            "#f5a623",
            "#ffcba4",
            "#ffd580",
          ],
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      {init && (
        <Particles
          id={props.id || "tsparticles"}
          init={particlesLoaded}
          options={options}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
          }}
        />
      )}
    </>
  );
};

export default Particle;
