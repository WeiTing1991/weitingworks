import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	maxWidth: 800,
	maxHeight: "80vh", // Limit height to 80% of viewport height
	bgcolor: "var(--background-color)",
	border: "2px solid var(--navy-shadow)",
	boxShadow: 24,
	p: 4,
	overflowY: "auto", // Enable vertical scrolling
};

function ModalProject({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<button
				onClick={handleOpen}
				style={{
					backgroundColor: "var(--navy)",
					color: "var(--white)",
					padding: "0.5rem",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
				}}
			>
				More Info{" "}
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component="section" sx={style}>
					<div className="modal-content">{children}</div>
				</Box>
			</Modal>
		</div>
	);
}
export default ModalProject;
