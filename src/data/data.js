import bar from "../Assets/BAR.png";
import threeBar from "../Assets/3xBAR.png";
import twoBar from "../Assets/2xBAR.png";
import seven from "../Assets/7.png";
import cherry from "../Assets/Cherry.png";

export const winningComb = [
  {
    id: 1,
    type: "triple",
    line: ["top"],
    value: ["cherry", "cherry", "cherry"],
    name: "3 CHERRY symbols on top line",
    point: 2000,
  },
  {
    id: 2,
    type: "triple",
    line: ["center"],
    value: ["cherry", "cherry", "cherry"],
    name: "3 CHERRY symbols on center line",
    point: 1000,
  },
  {
    id: 3,
    type: "triple",
    line: ["bottom"],
    value: ["cherry", "cherry", "cherry"],
    name: "3 CHERRY symbols on bottom line",
    point: 4000,
  },
  {
    id: 4,
    type: "triple",
    line: ["top", "center", "bottom"],
    value: ["7", "7", "7"],
    name: "3 7 symbols on any line",
    point: 2000,
  },
  {
    id: 5,
    type: "any",
    line: ["top", "center", "bottom"],
    value: ["cherry", "7"],
    name: "Any combination of CHERRY and 7 on any line",
    point: 75,
  },
  {
    id: 6,
    type: "triple",
    line: ["top", "center", "bottom"],
    value: ["3bar", "3bar", "3bar"],
    name: "3 3xBAR symbols on any line",
    point: 50,
  },
  {
    id: 7,
    type: "triple",
    line: ["top", "center", "bottom"],
    value: ["2bar", "2bar", "2bar"],
    name: "3 2xBAR symbols on any line",
    point: 20,
  },
  {
    id: 8,
    type: "triple",
    line: ["top", "center", "bottom"],
    value: ["bar", "bar", "bar"],
    name: "3 BAR symbols on any line",
    point: 10,
  },
  {
    id: 9,
    type: "any",
    line: ["top", "center", "bottom"],
    value: ["bar"],
    name: "Combination of any BAR symbols on any line",
    point: 5,
  },
];

export const data = [
  {
    value: ["3bar", null, "bar"],
    urls: {
      top: threeBar,
      bottom: bar,
    },
  },
  {
    value: ["bar", null, "2bar"],
    urls: {
      top: bar,
      bottom: twoBar,
    },
  },
  {
    value: ["2bar", null, "7"],
    urls: {
      top: twoBar,
      bottom: seven,
    },
  },
  {
    value: ["7", null, "cherry"],
    urls: {
      top: seven,
      bottom: cherry,
    },
  },
  {
    value: ["cherry", null, "3bar"],
    urls: {
      top: cherry,
      bottom: threeBar,
    },
  },
  {
    value: [null, "3bar", null],
    urls: {
      top: cherry,
      center: threeBar,
      bottom: bar,
    },
  },
  {
    value: [null, "bar", null],
    urls: {
      top: threeBar,
      center: bar,
      bottom: twoBar,
    },
  },
  {
    value: [null, "2bar", null],
    urls: {
      top: bar,
      center: twoBar,
      bottom: seven,
    },
  },
  {
    value: [null, "7", null],
    urls: {
      top: twoBar,
      center: seven,
      bottom: cherry,
    },
  },
  {
    value: [null, "cherry", null],
    urls: {
      top: seven,
      center: cherry,
      bottom: threeBar,
    },
  },
];
