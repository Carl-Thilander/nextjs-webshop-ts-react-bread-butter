import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";

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
			<DialogTitle>Products not available</DialogTitle>
			<DialogContent dividers>
				{items.length === 0 ? (
					<DialogContentText>
						One or more products in your cart are out of stock.
					</DialogContentText>
				) : (
					items.map(({ productName, available, requested }) => (
						<DialogContentText key={productName}>
							You have {requested} psc of {productName} in your cart, but only{" "}
							{available} psc is in stock. Please update your cart.
						</DialogContentText>
					))
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
