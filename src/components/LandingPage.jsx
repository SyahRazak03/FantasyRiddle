import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <div className="landing-inner">

        {/* Crest */}
        <div className="landing-crest">
          <div className="crest-ring">
            <img
              src="/icons/icon-192.png"
              alt="FantasyRiddle crest"
              className="crest-icon"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="landing-title">Fantasy Riddle</h1>
        <p className="landing-subtitle">The Oracle's Challenge</p>

        {/* Ornament */}
        <div className="ornament-row">
          <span className="ornament-line" />
          <span className="ornament-gem">&#10022;</span>
          <span className="ornament-line" />
        </div>

        {/* Lore */}
        <p className="landing-lore">
          Five adventurers have gathered in the realm. Their identities are shrouded
          in mystery. Using ancient clues and the power of logical deduction, uncover
          the truth hidden within the Oracle's scroll.
        </p>

        {/* Actions */}
        <div className="landing-actions">
          <button className="btn-medieval primary" onClick={() => navigate('/select')}>
            Begin Quest
          </button>
          <button className="btn-medieval" onClick={() => navigate('/how-to-play')}>
            How to Play
          </button>
        </div>

      </div>
    </div>
  )
}
