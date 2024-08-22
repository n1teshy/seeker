const OBSTACLE_DENSITY = 0.2;
const OBSTACLE_COLOR = "black";
const SOURCE_COLOR = "green";
const DESTINATION_COLOR = "green";
const STEP_DELAY_MS = 100;

const highlightColors = ["#000080", "#87CEEB", "#4169E1", "#367588", "#6A5ACD"]
const getHighlightColor = () => highlightColors[Math.floor(Math.random() * highlightColors.length)]
