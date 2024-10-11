import React from "react";
import * as allIcons from "@tabler/icons";

const TablerIcon = (props) => {
  const { icon, cssClass, size } = props;
  const IconComponent = allIcons[icon]
  return <IconComponent className={cssClass} size={size}/>;
};
export default TablerIcon;
