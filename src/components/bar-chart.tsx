import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { data } from "../../data";
const BarChart = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const getChart = () => {
    const width = 928;
    const height = 680;
    let { nodes, links } = data;

    const update = () => {
      return { nodes, links };
    };

    const drag = (simulation: any) => {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d.isDragging = true;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
        d.isDragging = true;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        d.isDragging = false;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    const simulation = d3
      .forceSimulation()
      .force("charge", d3.forceManyBody())
      .force(
        "link",
        d3.forceLink().id((d: any) => d.id)
      )
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("end", console.log)
      .on("tick", ticked);

    const svg = d3
      .create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");
    let link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line");

    let node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("text");
    let count = 0;
    function ticked() {
      // count += 0.01;
      // const cos = Math.cos(count);
      // node
      //   .attr("x", (d) => {
      //     return d.x;
      //   })
      //   .attr("y", (d) => {
      //     return d.y;
      //   });

      svg
        .selectAll("text")
        // .attr("r", (d) => d.radius)
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y)
        .attr("fill", "teal");

      // 노드에 무작위 움직임 추가
      // nodes.forEach(function (d) {
      //   d.x += Math.random() * 100;
      //   d.y += Math.random() * 100;
      // });

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
    }

    const chart = Object.assign(svg.node() as any, {
      update({ nodes, links }: any) {
        console.log(count);
        // Make a shallow copy to protect against mutation, while
        // recycling old nodes to preserve position and velocity.
        const old = new Map(node.data().map((d: any) => [d.id, d]));
        nodes = nodes.map((d: any) => ({ ...(old.get(d.id) as any), ...d }));
        links = links.map((d: any) => ({ ...d }));
        node = node
          .data(nodes, (d: any) => d.id)
          .join((enter) => {
            return enter
              .append("text")
              .attr("r", 5)
              .text((d: any) => {
                return d.text;
              })
              .call(drag(simulation) as any)
              .call((node) => node.append("title").text((d: any) => d.id));
          });

        link = link
          .data(links, (d: any) => [d.source, d.target] as any)
          .join("line");

        simulation.nodes(nodes);
        //@ts-ignore
        simulation.force("link").links(links);
        simulation.alpha(1).restart().tick();
        ticked(); // render now!
      },
    });

    chart.update(update());

    return chart;
  };
  useEffect(() => {
    if (divRef.current) {
      const svg = getChart();
      divRef.current.append(svg);
    }
  }, []);
  return <div ref={divRef}></div>;
};

export default BarChart;
