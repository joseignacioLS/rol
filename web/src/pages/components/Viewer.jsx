import React from 'react';
import { DataContext } from '../../core/Context/DataContext';
import P from './TextComponents/P';
import Image from './TextComponents/Image';
import H from './TextComponents/H';
import Li from './TextComponents/Li';
import Span from './TextComponents/Span';

const getValuesFromSentence = (sentence) => {
  const result = {
    key: '',
    content: '',
    options: [],
  };
  const regexKey = /^(!|#{1,3}|\$|\>|\-) /;
  const regexOptions = /\|.*$/;

  let keyLength = 0;
  const foundKey = sentence.match(regexKey);
  if (foundKey) {
    keyLength = foundKey[0].length;
    result.key = foundKey[0].trim();
  }

  const foundOptions = sentence.match(regexOptions);
  let optionsLength = 0;
  if (foundOptions) {
    optionsLength = foundOptions[0].length;
    result.options = foundOptions[0].split('|').slice(1);
  }
  result.content = sentence
    .split('')
    .slice(keyLength, sentence.length - optionsLength)
    .join('');
  return result;
};

const wrapper = ({ key, i, content, style, className }) => {
  const extra = {};
  if (key[0] === '#') {
    extra.hLevel = key.length + 1;
    key = '#';
  }
  const d = {
    '!': null,
    '#': (
      <H
        key={'h' + extra.hLevel + i}
        content={content}
        level={extra.hLevel}
        style={style}></H>
    ),
    '': (
      <P
        key={'p' + i}
        content={content}
        style={style}
        className={className}></P>
    ),
    '-': <Li key={'li' + i} content={content} style={style}></Li>,
    $: <Image key={'img' + i} src={content} style={style}></Image>,
    '>': (
      <P key={'q' + i} content={content} style={style} className={'quote'}></P>
    ),
  };
  return d[key];
};

function Viewer() {
  const { data, path, dataDispatcher } = React.useContext(DataContext);

  const processContent = (content, options) => {
    const style = options
      ? {
          align: options[0] || 'left',
          size: options[1] ? options[1] : '',
        }
      : {};
    const result = content.split(' ').map((part, i) => {
      const splitted = part.split('@');
      if (splitted.length === 1 || splitted[1].length === 0) {
        return part + ' ';
      }
      return (
        <Span
          key={`span${i}`}
          clickF={() =>
            dataDispatcher({
              type: 'path',
              payload: splitted[1].split('/'),
            })
          }
          content={splitted[0].split('_').join(' ') + ' '}
          className={'link'}></Span>
      );
    });
    return [result, style];
  };

  const processPage = (page) => {
    if (!page?.raw) return undefined;
    return page?.raw.split(/\r|\n/g).reduce((acc, curr, i) => {
      const { key, content, options } = getValuesFromSentence(curr);
      const [processedContent, style] = processContent(content, options);
      return [
        ...acc,
        wrapper({
          key,
          i: i,
          content: processedContent,
          style,
        }),
      ];
    }, []);
  };

  return (
    <div className='viewer'>
      <div className='viewer__header'>
        <h1>{path.join('/')}</h1>
        {path[0] !== 'Home' && (
          <span
            className='link'
            onClick={() => {
              dataDispatcher({
                type: 'path',
                payload: data.back,
              });
            }}>
            Back
          </span>
        )}
      </div>
      {processPage(data)}
    </div>
  );
}

export default Viewer;
