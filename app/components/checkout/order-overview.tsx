"use client";

import { useCart } from "@/hooks/useCart";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

export default function OrderOverview() {
	const { cartItems, totalSum } = useCart();

	return (
		<Box
			sx={{
				width: "100%",
				px: { xs: 1, sm: 2, md: 4.5 },
				py: 3,
			}}
		>
			<Typography variant="h1">Order Summary</Typography>
			<Box
				sx={{
					backgroundColor: "background.default",
					mt: 2,
				}}
			>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ p: 1 }}>Product</TableCell>
								<TableCell align="right" sx={{ p: 1 }}>
									Quantity
								</TableCell>
								<TableCell align="right" sx={{ p: 1 }}>
									Price/unit
								</TableCell>
								<TableCell align="right" sx={{ p: 1 }}>
									Subtotal
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cartItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell
										component="th"
										scope="row"
										sx={{
											fontWeight: "bold",
											display: "flex",
											alignItems: "center",
											gap: "0.5rem",
										}}
									>
										<Box
											component="img"
											src={item.image}
											alt={item.title}
											sx={{
												width: "50px",
												height: "50px",
												objectFit: "contain",
												display: { xs: "none", sm: "block" },
											}}
										/>

										{item.title}
									</TableCell>
									<TableCell align="right">{item.quantity}</TableCell>
									<TableCell align="right">{item.price}</TableCell>
									<TableCell align="right">
										{(item.quantity * item.price).toFixed(2)}
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell colSpan={3} align="right">
									<strong>Total</strong>
								</TableCell>
								<TableCell align="right">
									<strong>{totalSum.toFixed(2)} €</strong>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}
