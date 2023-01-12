import React, { useContext } from 'react';
import './App.css';
import Builder from './pages/Builder';
import { useSearchParams } from 'react-router-dom';
import Modal from './core/Modal';
import { DataContext } from './core/Context/DataContext';

function App() {
  const [searchParams] = useSearchParams();
  const { gameData, selected, dataDispatcher } = useContext(DataContext);
  const canEdit =
    searchParams.get('editor') === 'true' &&
    window.location.hostname === 'localhost';
  const gameTag = searchParams.get('game');

  React.useEffect(() => {
    dataDispatcher({
      type: 'select',
      payload: gameTag,
    });
  }, [gameTag, dataDispatcher]);

  return (
    <>
      <Builder canEdit={canEdit} />
      <Modal />
      {canEdit && (
        <div className='file-management'>
          <button
            className='btn download'
            onClick={() => {
              console.log(selected);
              const dataToDownload = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(gameData)
              )}`;
              const link = document.createElement('a');
              link.href = dataToDownload;
              link.download = `${selected}.json`;
              link.click();
            }}>
            Download
          </button>
          <div className='btn'>
            <input
              className='game-upload-input'
              type='file'
              accept='application/json'
              onInput={(e) => {
                const file = e.target.files[0];
                let name = '';

                if (file) {
                  name = file.name.replace('.json', '');
                  // faltaria validar la estructura del JSON
                }
                const reader = new FileReader();

                reader.onload = (() => {
                  return (e) => {
                    dataDispatcher({
                      type: 'set',
                      payload: {
                        title: name,
                        body: JSON.parse(e.target.result),
                      },
                    });
                  };
                })(file);

                reader.readAsText(file);
              }}
            />
            <p>Load</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
