import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="mb-5 mt-5">
        <h1>Let's Paint! 🎨</h1>
      </div>
        <Link to="/paint" className="me-5">Start 🖌</Link>
        <Link to="/gallery">Gallery 🖼</Link>
    </div>
  )
}
