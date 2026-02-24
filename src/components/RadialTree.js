"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function TopDownTree() {
  const ref = useRef();

  useEffect(() => {
    const data = {
      name: "Bias",
      children: [
        {
          name: "För mycket information",
          children: [
            { name: "Bizarreness effect" },
            { name: "Change blindness" },
            { name: "Confirmation bias" },
            { name: "Clustering illusion" },
            { name: "Halo effect" },
            { name: "In-group bias" },
          ],
        },
        {
          name: "Inte tillräckligt med mening",
          children: [
            { name: "Stereotyping" },
            { name: "False memory" },
            { name: "Illusion of transparency" },
            { name: "Curse of knowledge" },
            { name: "Projection bias" },
            { name: "Gambler’s fallacy" },
            { name: "Law of small numbers" },
          ],
        },
        {
          name: "Behov av att agera snabbt",
          children: [
            { name: "Availability heuristic" },
            { name: "Anchoring bias" },
            { name: "Status quo bias" },
            { name: "Loss aversion" },
            { name: "Sunk cost fallacy" },
            { name: "Illusion of control" },
            { name: "Optimism bias" },
            { name: "Present bias" },
          ],
        },
        {
          name: "Vad vi minns",
          children: [
            { name: "Recency effect" },
            { name: "Frequency illusion" },
            { name: "Consistency bias" },
            { name: "Misattribution" },
            { name: "Story bias" },
          ],
        },
      ],
    };

    const width = 1200;
    const dx = 20;
    const dy = 180;
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    const root = d3.hierarchy(data);
    tree(root);

    let x0 = Infinity;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("viewBox", [0, x0 - 20, width, x1 - x0 + 40])
      .style("font", "10px sans-serif")
      .style("user-select", "none");

    const g = svg.append("g").attr("transform", `translate(40,${-x0 + 20})`);

    const link = g
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", diagonal);

    const node = g
      .append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .on("mouseover", function (event, d) {
        link.attr("stroke", (l) =>
          l.source === d ||
          l.target === d ||
          l.source.ancestors().includes(d) ||
          l.target.ancestors().includes(d)
            ? "gold"
            : "#555"
        );
      })
      .on("mouseout", () => {
        link.attr("stroke", "#555");
      });

    node
      .append("circle")
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 3);

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -8 : 8))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke", "white");
  }, []);

  return <div ref={ref} />;
}
