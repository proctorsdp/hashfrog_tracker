import { Fragment, useMemo } from "react";

import { splitIntoChunk } from "../utils/utils";
import LocationHint from "./LocationHint";
import SometimesHint from "./SometimesHint";

const HintsTable = props => {
  const {
    id = "0a29c2debb1c442fbcc8c03334d60c38",
    hintType = "sometimes", // sometimes, location
    hintNumber = 1,
    columns = 1,
    width = 200,
    padding = 2, // space between the hint element inside table
    labels = "sometimes",
    color = "#ffffff",
    backgroundColor = "#333333",
    icons = [],
    bossIcons = [],
    // Sometimes only
    showIcon = true, // Hides the icon
    inverted = false, // switch place of the icon/item
    dual = false, // Show 2 items
    // Location only
    showBoss = true, // Show or not the left boss icon
    showItems = true, // Show or not the right icons
    bossReceiver = false,
    bossElementsIcons = [], // Elements that the user has chosen to appear in the boss selection. Would overwrite the default bossElement.icons cache
    hidden = false
  } = props;

  const rows = useMemo(() => {
    const hintRows = [];
    for (let i = 0; i < hintNumber; i++) {
      if (hintType === "sometimes") {
        hintRows.push(
          <td key={`${i}-${id}`} style={{ padding }}>
            <SometimesHint
              labels={labels}
              width={width}
              color={color}
              backgroundColor={backgroundColor}
              icons={icons}
              showIcon={showIcon}
              inverted={inverted}
              dual={dual}
              id={id+i}
            />
          </td>,
        );
      } else if (hintType === "location") {
        hintRows.push(
          <td key={`${i}-${id}`} style={{ padding }}>
            <LocationHint
              labels={labels}
              width={width}
              color={color}
              backgroundColor={backgroundColor}
              itemsIcons={icons}
              bossIcons={bossIcons}
              showBoss={showBoss}
              showItems={showItems}
              bossReceiver={bossReceiver}
              bossElementsIcons={bossElementsIcons}
              id={id+i}
            />
          </td>,
        );
      }
    }

    const splitArray = splitIntoChunk(hintRows, columns);

    return splitArray.map((rows, index) => <tr key={index}>{rows}</tr>);
  }, [
    id,
    columns,
    hintType,
    hintNumber,
    labels,
    width,
    color,
    backgroundColor,
    padding,
    icons,
    bossIcons,
    showIcon,
    inverted,
    showBoss,
    showItems,
    dual,
    bossReceiver,
    bossElementsIcons
  ]);

  return (
    <Fragment>
      <table style={{ borderSpacing: 0 }} hidden={hidden}>
        <tbody>{rows}</tbody>
      </table>
    </Fragment>
  );
};

export default HintsTable;
