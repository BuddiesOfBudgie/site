// This contains misc. variables useful in various components

import { ResponsiveStyleValue } from "@mui/system"

type StackDirectionMap = ResponsiveStyleValue<"column" | "row" | "row-reverse" | "column-reverse">;

// StackDirectionColumnToRow is our Object to dynamically change our mobile column to desktop row layout
export const StackDirectionColumnToRow : StackDirectionMap = {
	xs: "column",
	sm: "column",
	md: "column",
	lg: "row",
	xl: "row",
	subfullhd: "row",
	fullhd: "row",
}