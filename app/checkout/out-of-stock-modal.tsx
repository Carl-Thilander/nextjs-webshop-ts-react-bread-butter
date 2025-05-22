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
	productName?: string;
	available?: number;
	requested?: number;
}

export default function OutOfStockModal({
	open,
	onClose,
	productName,
	available,
	requested,
}: Props) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Product not available</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{productName
						? `You have ${requested} pcs of ${productName} in your cart, but only ${available} pcs is in stock. Please update your cart`
						: `One or more products in your cart are out of stock`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
