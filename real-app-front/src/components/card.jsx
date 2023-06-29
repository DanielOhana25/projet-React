import { Link } from "react-router-dom";
const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage },
}) => {
  return (
    <div
      className="card ms-2 me-2 mt-3 mb-3 shadow p-3 bg-body-tertiary rounded"
      style={{ width: "18rem" }}
    >
      <img src={bizImage} className="card-img-top" alt={bizName} />
      <div className="card-body">
        <h5 className="card-title">{bizName}</h5>
        <p className="card-text">{bizDescription}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{bizAddress}</li>
          <li className="list-group-item">{bizPhone}</li>
        </ul>
        <div className="d-flex justify-content-between me-3 ms-3">
          <Link to={`/my-cards/edit/${_id}`}>
            <button className="btn btn-primary border-0 fs-5 hover-zoomin">
              <i className="bi bi-pencil"></i>
            </button>
          </Link>{" "}
          <Link to={`/my-cards/delete/${_id}`}>
            <button className="btn btn-danger border-0 fs-5 hover-zoomin">
              <i className="bi bi-trash3"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
