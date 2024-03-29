import React, { Fragment } from 'react';
import Link from 'next/link';
import escapeHTML from 'escape-html';

type Node = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
  newTab?: boolean;
};

export type CustomRenderers = {
  [key: string]: (args: {
    node: Node;
    Serialize: SerializeFunction;
    index: number;
  }) => JSX.Element; // eslint-disable-line
};

type SerializeFunction = React.FC<{
  content?: Node[];
  customRenderers?: CustomRenderers;
}>;

const isText = (value: any): boolean =>
  typeof value === 'object' && value !== null && typeof value.text === 'string';

export const Serialize: SerializeFunction = ({ content, customRenderers }) => {
  return (
    <Fragment>
      {content?.map((node, i) => {
        if (isText(node)) {
          let text = (
            // @ts-expect-error
            <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          );

          if (node.bold) {
            text = <strong key={i}>{text}</strong>;
          }

          if (node.code) {
            text = <code key={i}>{text}</code>;
          }

          if (node.italic) {
            text = <em key={i}>{text}</em>;
          }

          if (node.underline) {
            text = (
              <span style={{ textDecoration: 'underline' }} key={i}>
                {text}
              </span>
            );
          }

          if (node.strikethrough) {
            text = (
              <span style={{ textDecoration: 'line-through' }} key={i}>
                {text}
              </span>
            );
          }

          if (node.text === '') {
            text = <br />;
          }

          return <Fragment key={i}>{text}</Fragment>;
        }

        if (!node) {
          return null;
        }

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === 'function'
        ) {
          return customRenderers[node.type]({ node, Serialize, index: i });
        }

        switch (node.type) {
          case 'upload':
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={node.value?.url}
                alt={node.value?.alt}
                className="rounded-md"
              />
            );
          case 'indent':
            return (
              <div className="ml-5">
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </div>
            );
          case 'br':
            return <br key={i} />;

          case 'h1':
            return (
              <h1
                key={i}
                className="text-dark-500 text-5xl font-bold mb-3 mt-4"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h1>
            );

          case 'h2':
            return (
              <h2
                key={i}
                className="text-dark-500 text-4xl font-bold mb-3 mt-4"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={i}
                className="text-dark-500 text-3xl font-semibold mb-3 mt-4"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h3>
            );

          case 'h4':
            return (
              <h4
                key={i}
                className="text-dark-500 text-2xl font-semibold mb-1 mt-3"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h4>
            );

          case 'h5':
            return (
              <h5
                key={i}
                className="text-dark-500 text-xl font-semibold mb-1 mt-3"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h5>
            );

          case 'h6':
            return (
              <h6 key={i} className="text-dark-500 text-lg font-semibold mb-1">
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h6>
            );

          case 'quote':
            return (
              <blockquote key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ul>
            );

          case 'ol':
            return (
              <ol key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ol>
            );

          case 'li':
            return (
              <li key={i} className="flex gap-x-2">
                <span>•</span>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </li>
            );

          case 'link':
            return (
              <Link
                href={escapeHTML(node.url)}
                key={i}
                {...(node.newTab
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
                className="text-primary-400"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </Link>
            );

          default:
            return (
              <p key={i} className="text-dark-500 my-1">
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            );
        }
      })}
    </Fragment>
  );
};
