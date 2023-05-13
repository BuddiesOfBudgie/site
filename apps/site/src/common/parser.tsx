/**
 * This file contains our HTML plaintext parser, leveraging html-react-parser
 * The purpose of this is to more easily incorporate our own components, stying, and replace Ghost UX with our own
 */

import React from "react";
import parse, { Element } from "html-react-parser";
import type { HTMLReactParserOptions, domToReact } from "html-react-parser";

// Our Components
import { LightboxImage } from "../components/LightboxImage";

const Parser = (html: string): ReturnType<typeof domToReact> => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "comment") {
        // Is a comment
        return <></>; // Filter it out
      }

      if (!(domNode instanceof Element)) {
        return;
      }

      const attribs = domNode.attribs;

      if (domNode.name == "img") {
        // Is an image, replace with our LightboxImage
        const src = attribs.src as string;

        const height = Number(attribs.height);
        const width = Number(attribs.width);

        if (!height || !width || isNaN(height) || isNaN(width)) {
          return;
        }

        return <LightboxImage altImageText={attribs.alt} height={height} image={src} width={width} />;
      }

      return;
    },
  };

  return parse(html, options);
};

export default Parser;
