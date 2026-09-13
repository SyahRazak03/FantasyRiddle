export default function CluePanel({ clues }) {
  return (
    <div className="clue-panel">

      <div className="clue-panel-head">
        <h2 className="clue-panel-title">The Ancient Scroll</h2>
        <div className="scroll-rule" />
      </div>

      <div className="clue-list">
        {clues.map(clue => (
          <div key={clue.id} className="clue-item">
            <span className="clue-num">{clue.id}.</span>
            <span className="clue-text">{clue.text}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
