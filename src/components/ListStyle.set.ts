import {
  IProcessedStyleSet,
  IStyle,
  mergeStyleSets,
} from "@fluentui/react/lib/index.bundle";

interface ListStyleProps {
  listItem: IStyle;
  iconStyle: IStyle;
}
const ListStyleSet: IProcessedStyleSet<ListStyleProps> = mergeStyleSets({
  listItem: {
    maxHeight: 50,
    minHeight: 30,
    padding: 10,
    width: "100%",
    backgroundColor: "#f1f5f9",
    selectors: {
      "&:hover": { background: "#cbd5e1" },
    },
    margin: 5,
    display: "flex",
    alignItems: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  },

  iconStyle: {
    fontSize: 20,
    margin: "0 3px",
    selectors: {
        "&:hover": { cursor: "pointer"},
      },
  }
});

export default ListStyleSet;
