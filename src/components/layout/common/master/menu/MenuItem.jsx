import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MenuItem = (props) => {
  const { title, items, icon, url, guid, element, onNavClick } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    let existItems = (Array.isArray(items) && items.length) > 0;
    setHasItems(existItems);
  }, [items]);

  const onMenuClick = (e) => {
    let obj = {
      title: title,
      icon: icon,
      guid: guid,
      element: element,
      url: url,
    };
    onNavClick(obj);
  };

  const onChildMenuClick = (e, item) => {
    onNavClick(item);
  };

  return (
    <li className="nav-item">
      {!hasItems ? (
        <Link
          key={guid}
          onClick={(e) => onMenuClick(e)}
          role="button"
          className="nav-link"
        >
          {icon}
          <span>{title}</span>
        </Link>
      ) : (
        <Link
          key={guid}
          role="button"
          data-bs-toggle={hasItems === true ? "collapse" : ""}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          className="nav-link"
        >
          {icon}
          <span>{title}</span>
        </Link>
      )}

      {hasItems ? (
        <div className={`collapse ${isExpanded ? "show" : ""}`}>
          <ul className="nav flex-column">
            {items.map((item, index) => (
              <li key={item.guid} className="nav-item">
                <Link
                  key={item.guid}
                  className="nav-link"
                  onClick={(e) => onChildMenuClick(e, item)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
};
export default MenuItem;
