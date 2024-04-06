const EventStyling = (event, start, end, isSelected) => {
  const colorMap = new Map([
    // ["Meeting", "#80D5DB"],
    ["Meeting", " #cc6751"],
    ["AL", "#c7c9cd"],
  ]);

  // [ "#E1F296","#80D5DB","#BAEDBD","#B3CCCE","#B1E3FF"],
  const backgroundColor = colorMap.get(event.event?.eventType) || "#f28f6b";

  const style = {
    backgroundColor,
    borderRadius: "3px",
    color: "#01565B",
    marginBottom: "5px",
    // height: "50px",
    borderLeft: "4px solid #01565B",
    display: "block",
    fontWeight: "bold",
  };

  return {
    style,
  };
};

export default EventStyling;
