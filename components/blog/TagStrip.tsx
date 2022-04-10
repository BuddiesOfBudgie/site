/**
 * This file contains our component for displaying a flowing list of all tags for a post
 */

import { Tag } from "@tryghost/content-api"
import Link from "next/link";

// Material UI Components
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type TagStripParams = {
	tags: Tag[]
};

export const TagStrip : React.FC<TagStripParams> = (props) => {
	return (
		<Stack direction="row" flexWrap="wrap" spacing={1}>
		{ props.tags.map((tag) => {
			const tagName = tag.name ?? tag.meta_title ?? tag.og_title ?? `${tag.slug.toLocaleUpperCase(tag.slug.substring(0, 1))}${tag.slug.substring(1)}`;
			return (
				<Link
					key={`TagStrip-Item-${tagName}`}
					href={`/blog?tag=${encodeURIComponent(tag.slug)}`}
					passHref={true}
					prefetch={false}
				>
					<Button	color={"success"} variant="outlined">{tagName}</Button>
				</Link>
			);
		})
		}
		</Stack>
	)
}