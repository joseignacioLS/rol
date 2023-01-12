import React from 'react';
import Editor from './components/Editor';
import Viewer from './components/Viewer';
import './Builder.scss';
import { DataContext } from '../core/Context/DataContext';

function Builder({ canEdit, setModalData }) {
  const { listOfPages, path, dataDispatcher } =
    React.useContext(DataContext);

  React.useEffect(() => {
    document.querySelector('.viewer')?.scrollTo(0, 0);
  }, [path]);

  return (
    <>
      <main>
        {canEdit && (
          <select
            className='nav'
            onChange={(e) => {
              dataDispatcher({
                type: 'path',
                payload: e.currentTarget.value.split('/'),
              });
            }}
            value={path.join('/')}>
            {listOfPages?.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        )}
        <div className='builder'>
          {canEdit && <Editor setModalData={setModalData} />}
          <Viewer />
        </div>
        
      </main>
    </>
  );
}

export default Builder;
