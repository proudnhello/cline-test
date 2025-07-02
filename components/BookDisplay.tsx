import { Book } from '../types';

interface BookDisplayProps {
  book: Book | null;
  onWrite: () => void;
}

export default function BookDisplay({ book, onWrite }: BookDisplayProps) {
  if (!book) {
    return (
      <div>
        <h2>No book selected</h2>
        <p>Click "New Book" to start writing.</p>
      </div>
    );
  }

  const progress = (book.wordsWritten / book.wordCount) * 100;

  return (
    <div>
      <h2>{book.genre}</h2>
      <p>
        {book.wordsWritten} / {book.wordCount} words
      </p>
      <progress value={progress} max="100" />
      <button onClick={onWrite}>Write</button>
    </div>
  );
}
