import { Vector } from "./way-finder/Vector";

export const noop = () => {};

export const getImagePath = (imageUrl: string) => {
  return import.meta.env.PROD ? imageUrl : imageUrl;
};

export const numberWithinRange = (
  number: number,
  min: number,
  max: number
): number => Math.min(Math.max(number, min), max);

const reESC = /[\\^$.*+?()[\]{}|]/g;
const reChar = /[가-힣]/;
const reJa = /[ㄱ-ㅎ]/;
const offset = 44032;

const orderOffest = [
  ["ㄱ", 44032],
  ["ㄲ", 44620],
  ["ㄴ", 45208],
  ["ㄷ", 45796],
  ["ㄸ", 46384],
  ["ㄹ", 46972],
  ["ㅁ", 47560],
  ["ㅂ", 48148],
  ["ㅃ", 48736],
  ["ㅅ", 49324],
];

const generatePatternForConsonants = (chs: string) => {
  let regexPattern = "";

  for (let i = 0; i < chs.length; i++) {
    const ch = chs[i];
    if (reJa.test(ch)) {
      const begin =
        con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
      const end = begin + 587;
      regexPattern += `([\\u${begin.toString(16)}-\\u${end.toString(16)}])`;
    } else {
      regexPattern += ch.replace(reESC, "\\$&");
    }
  }

  return regexPattern;
};

const con2syl = Object.fromEntries(orderOffest as readonly any[]);
// const pattern = (ch: string) => {
//   let r;
//   if (reJa.test(ch)) {
//     const begin =
//       con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
//     const end = begin + 587;
//     r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
//   } else if (reChar.test(ch)) {
//     const chCode = ch.charCodeAt(0) - offset;
//     if (chCode % 28 > 0) return ch;
//     const begin = Math.floor(chCode / 28) * 28 + offset;
//     const end = begin + 27;
//     r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
//   } else r = ch.replace(reESC, "\\$&");
//   return `(${r})`;
// };

export const isContain초성 = (query: string, target: string) => {
  // const reg = new RegExp(query.split("").map(pattern).join(".*?"), "i");
  const reg = new RegExp(generatePatternForConsonants(query));
  const matches = reg.exec(target);
  return Boolean(matches);
};

export const xmlToJsonFromString = (xmlString: string) => xml2json(xmlString);

function parseXML(data?: string) {
  var xml, tmp;
  if (!data || typeof data !== "string") {
    throw new Error("유효하지 않은 데이터", { cause: "INVALID_DATA" });
  }
  try {
    // Standard
    tmp = new DOMParser();
    xml = tmp.parseFromString(data, "text/xml");
  } catch (e) {
    xml = undefined;
  }
  if (
    !xml ||
    !xml.documentElement ||
    xml.getElementsByTagName("parsererror").length
  ) {
    throw new Error("Invalid XML: " + data);
  }
  return xml;
}

var defaultOptions = {
  attrkey: "$",
  charkey: "_",
  normalize: false,
};

const normalize = <T>(
  value: string | null,
  options: typeof defaultOptions
): unknown => {
  if (!!options.normalize) {
    return (value || "").trim();
  }
  return value;
};

function xml2jsonImpl(xml: HTMLElement, options: typeof defaultOptions) {
  var i,
    result: { [key: string]: any } = {},
    attrs: { [key: string]: any } = {},
    child,
    name;

  let node: HTMLElement;

  result[options.attrkey] = attrs;

  if (xml.attributes && xml.attributes.length > 0) {
    for (i = 0; i < xml.attributes.length; i++) {
      var item = xml.attributes.item(i)!;
      attrs[item.nodeName] = item.value;
    }
  }

  // element content
  if (xml.childElementCount === 0) {
    result[options.charkey] = normalize(xml.textContent, options);
  }
  xml.childNodes.forEach((childNode) => {
    node = childNode as HTMLElement;
    if (node.nodeType === 1) {
      if (node.attributes.length === 0 && node.childElementCount === 0) {
        child = normalize(node.textContent, options);
      } else {
        child = xml2jsonImpl(node, options);
      }

      name = node.nodeName;
      if (result.hasOwnProperty(name)) {
        // For repeating elements, cast/promote the node to array
        var val = result[name];
        if (!Array.isArray(val)) {
          val = [val];
          result[name] = val;
        }
        val.push(child);
      } else {
        result[name] = child;
      }
    }
  });

  return result;
}

/**w
 * Converts an xml document or string to a JSON object.
 *
 * @param {string?} xml
 */
function xml2json(xml?: string, options?: typeof defaultOptions) {
  if (!xml) {
    return xml;
  }

  options = options || defaultOptions;

  const parsedXMLData = parseXML(xml).documentElement;

  const root = {} as any;
  if (
    typeof parsedXMLData.attributes === "undefined" ||
    parsedXMLData.attributes === null
  ) {
    root[parsedXMLData.nodeName] = xml2jsonImpl(parsedXMLData, options);
  } else if (
    parsedXMLData.attributes.length === 0 &&
    parsedXMLData.childElementCount === 0
  ) {
    root[parsedXMLData.nodeName] = normalize(
      parsedXMLData.textContent,
      options
    );
  } else {
    root[parsedXMLData.nodeName] = xml2jsonImpl(parsedXMLData, options);
  }

  return root;
}

export const isVideoPlaying = (video: HTMLVideoElement) =>
  !!(
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );

export const shuffle = <T>(array: T[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export function calculateDistance(vector1: Vector, vector2: Vector) {
  const { x: x1, y: y1 } = vector1.getPosition();
  const { x: x2, y: y2 } = vector2.getPosition();
  return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
}

let preA11yId: string;

export const sendA11yEvent = (id: string, sameId?: boolean) => {
  console.log(
    "%c[PREVIOUS A11Y ID]: " + `%c${preA11yId}`,
    "color: #00BC68;",
    "color: #4F98E9;"
  );
  console.log(
    "%c[LATEST A11Y ID]: " + `%c${id}`,
    "color: #00BC68;",
    "color: #4F98E9;"
  );

  if (sameId && preA11yId) {
    console.log(
      "%c[SEND A11Y ID]: " + `%c${preA11yId}`,
      "color: #00BC68;",
      "color: #4F98E9;"
    );
    window.dispatchEvent(
      new CustomEvent("a11y", {
        detail: preA11yId,
      })
    );
  } else if (preA11yId !== id) {
    preA11yId = id;
    console.log(
      "%c[SEND A11Y ID]: " + `%c${id}`,
      "color: #00BC68;",
      "color: #4F98E9;"
    );
    window.dispatchEvent(
      new CustomEvent("a11y", {
        detail: id,
      })
    );
  }
};
