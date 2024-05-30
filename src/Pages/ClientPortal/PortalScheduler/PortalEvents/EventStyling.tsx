const EventStyling = (event, start, end, isSelected) => {
  const colorMap = new Map([
    ["Pending", "#D3F7F4"],
    ["Open", "#FFE0DC"],
    ["Assigned", "#E1F296"],
    ["Resolved", "#BAEDBD"],
    ["Closed", "#B1E3FF"],
    ["Cancelled", "#B3CCCE"],
  ]);

  const backgroundColor = colorMap.get(event?.jobStatus?.name) || "#D3F7F4";

  const style = {
    backgroundColor,
    borderRadius: "3px",
    color: "#01565B",
    marginBottom: "5px",
    height: "50px",
    borderLeft: "4px solid #01565B",
    padding: "2px",
    display: "block",
    fontWeight: "bold",
  };

  return {
    style,
  };
};

export default EventStyling;
