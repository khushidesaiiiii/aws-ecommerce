import { Link, replace, useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="action-cards">
        <Link to="/admin/orders">
          <div className="admin-actions">
            <h2>View user Orders</h2>
          </div>
        </Link>
      </div>
      <div className="action-cards">
        <Link to="/admin/chats">
          <div className="admin-actions">
            <h2>View User Queries</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
