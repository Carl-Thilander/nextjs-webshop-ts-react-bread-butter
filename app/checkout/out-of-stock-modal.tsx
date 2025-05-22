import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

interface Props {
	open: boolean;
	onClose: () => void;
}

export default function OutOfStockModal({ open, onClose }: Props) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Product not available</DialogTitle>
			<DialogContent>
				{/* change this */}
				<DialogContentText>Product is out of stock</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
