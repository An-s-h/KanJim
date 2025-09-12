import React, { useEffect, useRef, useState } from "react";

export default function KanjiStrokeOrder({ kanji }) {
  const [paths, setPaths] = useState([]);
  const [strokeNumbers, setStrokeNumbers] = useState([]);
  const [currentKanjiCode, setCurrentKanjiCode] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);
  const svgRef = useRef(null);

  const kanjiToCode = (kanjiChar) => {
    if (!kanjiChar) return "";
    const codePoint = kanjiChar.codePointAt(0);
    return codePoint.toString(16).toLowerCase().padStart(5, "0");
  };

  useEffect(() => {
    const code = kanjiToCode(kanji);
    setCurrentKanjiCode(code);
    setShowInvalid(false); // reset invalid
  }, [kanji]);

  useEffect(() => {
    if (!currentKanjiCode) return;

    fetch(`/kanji/${currentKanjiCode}.svg`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load SVG for code: ${currentKanjiCode}`);
        return res.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, "image/svg+xml");
        const pathEls = Array.from(svgDoc.querySelectorAll("path"));
        const textEls = Array.from(svgDoc.querySelectorAll("text"));

        setPaths(pathEls.map((p) => p.getAttribute("d")));
        setStrokeNumbers(
          textEls.map((t) => ({
            x: t.getAttribute("x"),
            y: t.getAttribute("y"),
            value: t.textContent,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
        setPaths([]);
        setStrokeNumbers([]);

        // Show invalid message after a short delay
        setTimeout(() => {
          setShowInvalid(true);
        }, 4000); // 0.8s delay before showing invalid
      });
  }, [currentKanjiCode, kanji]);

  useEffect(() => {
    if (!svgRef.current || paths.length === 0) return;

    const pathEls = svgRef.current.querySelectorAll("path");

    pathEls.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      // Slower animation: 1.5s per stroke + stagger
      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 1.5s ease";
        path.style.strokeDashoffset = "0";
      }, i * 1500); // stagger by 1.5s
    });
  }, [paths]);

  // Loading / Invalid states
  if (!currentKanjiCode || showInvalid) {
    return (
      <div className="w-[200px] h-[200px] flex items-center justify-center border border-gray-300">
        <span className="text-gray-500">Invalid kanji</span>
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <div className="w-[200px] h-[200px] flex items-center justify-center border border-gray-300">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <svg ref={svgRef} viewBox="0 0 109 109" className="w-[200px] h-[200px]">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {strokeNumbers.map((n, i) => (
        <text key={i} x={n.x} y={n.y} fontSize="8" fill="red">
          {n.value}
        </text>
      ))}
    </svg>
  );
}
