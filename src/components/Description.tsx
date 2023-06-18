import { FontIcon, TeachingBubble, mergeStyles } from "@fluentui/react";
import ListStyleSet from "./ListStyle.set";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { TaskProps } from "./Type";

type Props = {
  task: TaskProps;
};
const Description = ({ task }: Props) => {
  const buttonId = useId("targetButton");
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);

  return (
    <>
      <FontIcon
        id={buttonId}
        iconName="Info"
        className={
          task.description
            ? ListStyleSet.iconStyle
            : mergeStyles(ListStyleSet.iconStyle, ListStyleSet.disabled)
        }
        onClick={task.description ? toggleTeachingBubbleVisible : () => {}}
      />

      {teachingBubbleVisible && (
        <TeachingBubble
          target={`#${buttonId}`}
          headline={task.title}
          onDismiss={toggleTeachingBubbleVisible}
        >
          {task.description}
        </TeachingBubble>
      )}
    </>
  );
};

export default Description;
