import './StarRating.css'

function StarRating({ count }) {
  return (
    <div className="star-rating" aria-label={`별점 ${count}점`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`star${n <= count ? ' star--filled' : ''}`}
          style={{ animationDelay: `${n * 0.15}s` }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
