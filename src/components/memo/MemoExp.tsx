import * as React from 'react';

interface Props {

}

const MemoExp: React.FC<Props> = () => {
  const [text, setText] = React.useState<string>('');

  const reverseWord = (word: string) => {
    console.log('function called!!!');
    return word.split('').reverse().join('');
  };

  const mainTitle = 'Hello from react memo';
  const title = React.useMemo(() => reverseWord(text), [text]);
  React.useEffect(() => {
    if (text.length > 0) {
      setTimeout(() => {
        setText('');
      }, 5000);
    }
  }, [text]);
  return (
    <div>
      <h1 style={{ fontSize: 30, textAlign: 'center' }}>
        {title}
      </h1>
      <input
        type="text"
        name="text"
        value={text}
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
        }
        style={{
          outline: 0,
          margin: '2rem auto',
          display: 'block',
          width: '40rem',
          padding: '.8rem .5rem',
          fontSize: 20,
          boxShadow: '3px 5px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
};
export default MemoExp;
