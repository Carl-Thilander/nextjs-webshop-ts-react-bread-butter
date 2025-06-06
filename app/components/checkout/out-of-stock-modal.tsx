import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

export interface OutOfStockItems {
	productName: string;
	available: number;
	requested: number;
}

interface Props {
	open: boolean;
	onClose: () => void;
	items?: OutOfStockItems[];
}

export default function OutOfStockModal({ open, onClose, items = [] }: Props) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle variant="h5" textAlign="center" sx={{ fontWeight: "bold" }}>
				Products not available
			</DialogTitle>
			<DialogContent>
				{items.length === 0 ? (
					<DialogContentText textAlign="center">
						One or more products in your cart are out of stock.
					</DialogContentText>
				) : (
					items.map(({ productName, available, requested }) => (
						<DialogContentText textAlign="center" key={productName}>
							{available === 0 ? (
								<>
									<strong>{productName}</strong> is out of stock. Please update
									your cart.
								</>
							) : (
								<>
									You have {requested} pcs of <strong>{productName}</strong> in
									your cart, but only {available} pcs are in stock. Please
									update your cart.
								</>
							)}
						</DialogContentText>
					))
				)}
			</DialogContent>
			<DialogActions sx={{ justifyContent: "center" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={onClose}
					sx={{ mb: "0.7rem" }}
				>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
