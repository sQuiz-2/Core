import { parseAnswer } from '@squiz/shared';
import { useState } from 'react';

export default function TestAnswer() {
  const [testValue, setTestValue] = useState('');
  return (
    <>
      <hr className="border-0 bg-gray-500 text-gray-500 h-px my-4" />
      <h3 className="text-lg pb-4">Tester une réponse</h3>
      <div className="p-1">
        <label>Réponse:</label>
        <input
          name="question"
          className="border-2 border-black ml-1 w-96"
          value={testValue}
          onChange={(e) => setTestValue(e.target.value)}
        />
      </div>
      <div className="p-1 pb-10">
        <p>Résultat: {parseAnswer(testValue)}</p>
      </div>
    </>
  );
}
