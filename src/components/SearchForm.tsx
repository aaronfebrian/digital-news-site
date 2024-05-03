import "./searchForm.css";

export default function SearchForm({
  active,
  formOpen,
}: {
  active: boolean;
  formOpen: object | any;
}) {
  return (
    <div
      className={`search-form-wrap js-seacrh-form-warp ${
        active ? "active" : undefined
      }`}
    >
      <form className="search-form">
        <span className="icon bi-search"></span>
        <input type="text" placeholder="Search" className="form-control" />
        <button className="btn js-search-close" onClick={formOpen}>
          <span className="bi-x"></span>
        </button>
      </form>
    </div>
  );
}
