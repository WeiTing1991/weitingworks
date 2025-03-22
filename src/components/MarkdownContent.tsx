import Markdown from "react-markdown";
import { useState, useEffect } from "react";
import remarkGfm from 'remark-gfm'
import remarkImages from 'remark-images'
import rehypeHighlight from "rehype-highlight";

interface RenderMarkdownCssProps {
	content: string;
	className?: string;
}

const RenderMarkdownCss: React.FC<RenderMarkdownCssProps> = ({
	content,
	className = "",
}) => {
	return (
		<div className={`markdown-content ${className}`}>
			<Markdown remarkPlugins={[rehypeHighlight, remarkGfm, remarkImages]}>{content}</Markdown>
		</div>
	);
};

interface MarkdownContentProps {
	url: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
	url,
}: {
	url: string;
}) => {
	const [markdown, setMarkdown] = useState("");

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to load Markdown");
				}
				return response.text();
			})
			.then((text) => setMarkdown(text))
			.catch((error) => {
				console.error("Error:", error);
				setMarkdown("# Error\nCould not load the Markdown file.");
			});
	}, [url]);

	return (
		<div className="modal">
			<RenderMarkdownCss content={markdown} />
		</div>
	);
};

export default MarkdownContent;
