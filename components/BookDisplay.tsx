import { Book } from '../types';

interface BookDisplayProps {
  book: Book | null;
  onWrite: () => void;
}

export default function BookDisplay({ book, onWrite }: BookDisplayProps) {
  if (!book) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">No Book in Progress</h2>
        <p className="text-gray-400">Click "Start New Book" to begin.</p>
      </div>
    );
  }

  const progress = (book.wordsWritten / book.wordCount) * 100;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-2">{book.genre}</h2>
      <p className="text-lg text-gray-400 mb-4">
        {Math.floor(book.wordsWritten)} / {book.wordCount} words
      </p>
      <div className="w-full bg-gray-700 rounded-full h-8 mb-4">
        <div
          className="bg-blue-600 h-8 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button
        onClick={onWrite}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg text-2xl"
      >
        Write
      </button>
    </div>
  );
}
