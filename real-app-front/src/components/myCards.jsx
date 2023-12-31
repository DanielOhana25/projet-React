import { useMyCards } from "../hooks/useMyCards";
import Card from "./card";
import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";

const MyCards = () => {
  const cards = useMyCards();
  return (
    <>
      <PageHeader
        title="My Cards"
        description="your cards are in the list below"
      />
      <div className="row">
        <Link to="/create-card">Create a New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p>no cards yet</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};
export default MyCards;
